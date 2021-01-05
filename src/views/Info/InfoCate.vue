<template>
	<div id="category">
		<a-button type="danger" @click="addFirstCate">添加一级分类</a-button>
		<div class="category-wrap">
			<a-row>
				<a-col :span="8">
					<template v-if="category_data.list">
						<div
							class="cate-list"
							v-for="firstCateItem in category_data.list"
							:key="firstCateItem.id"
						>
							<div class="primary-item">
								<icon-font class="icon" :type="'icon-minus'" @click="toggleCate"></icon-font>
								<h4>{{ firstCateItem.category_name }}</h4>
								<div class="btn-group">
									<a-button
										size="small"
										shape="round"
										type="danger"
										@click="editFirstCate(firstCateItem)"
										>编辑</a-button
									>
									<a-button
										size="small"
										shape="round"
										type="primary"
										@click="addChild(firstCateItem)"
										>添加子级</a-button
									>
									<a-button
										size="small"
										shape="round"
										@click="deleteFirstCate(firstCateItem)"
										>删除</a-button
									>
								</div>
							</div>
							<ul v-if="firstCateItem.children">
								<li v-for="secCateItem in firstCateItem.children" :key="secCateItem.id">
									{{ secCateItem.category_name }}
									<div class="btn-group">
										<a-button size="small" shape="round" type="danger"
															@click="editSecCate(secCateItem)">编辑</a-button
										>
										<a-button size="small" shape="round"
															@click="deleteSecCate(secCateItem)">删除</a-button>
									</div>
								</li>
							</ul>
						</div>
					</template>
				</a-col>
				<a-col :span="15" :offset="1">
					<div class="primary-item-edit">
						<h4>一级分类编辑</h4>
						<div class="form">
							<a-form
								:model="category_form"
								:label-col="{ span: 3 }"
								label-align="left"
								ref="categoryForm"
								v-if="first_cate_status"
							>
								<a-form-item label="一级分类名称" v-if="first_cate_status">
									<a-input
										size="large"
										v-model:value="category_form.firstCateValue"
										placeholder="请输入一级分类名称"
									></a-input>
								</a-form-item>
								<a-form-item label="二级分类名称" v-if="sec_cate_status">
									<a-input
										size="large"
										v-model:value="category_form.secCateValue"
										placeholder="请输入二级分类名称"
										
									></a-input>
								</a-form-item>
								<a-form-item :wrapper-col="{ offset: 3 }">
									<a-button type="danger" @click="submitCate">确定</a-button>
								</a-form-item>
							</a-form>
						</div>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>
<script>
// IconFont引入
import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_2250507_32pzfpxdk9m.js",
});
// 接口
import {
	addFirstCategory,
	getCategoryAll,
	addChildrenCategory,
	deleteCategory,
	putCategory
} from "@/network/category";
// message弹窗
import { message } from "ant-design-vue";
// async await捕获错误
import { awaitWrap } from "@/libs/utils/tools";
// comfirm
import { useConfirm } from "@/libs/utils/useConfirm";
import { reactive, ref, nextTick, onMounted, watch, } from "vue";
import { useCateData } from "@/network/common";
export default {
	name: "InfoCate",
	components: {
		IconFont,
	},
	setup() {

		const { category_data, GetCategoryAll } = useCateData()
		/**
		 * deletecomfirm
		 */
		const { Confirm } = useConfirm();
		/**
		 * refs
		 */
		const categoryForm = ref(null);
		// console.log(categoryForm);
		/**
		 * 分类表单数据绑定
		 */
		const category_form = reactive({
			firstCateValue: "",
			secCateValue: "",
		});
		/**
		 * 记录编辑状态
		 */
		const editFlag = reactive({
			first: false,
			second: false,
		});
		/**
		 * 分类列表
		 */
		// const category_data = reactive({
		// 	list: [],
		// });
		/**
		 * 一级分类input status
		 */
		const first_cate_status = ref(false);
		/**
		 * 二级分类input status
		 */
		const sec_cate_status = ref(false);

    /**
     * 记录当前分类cu	rrentCate
     */
    const currentCate = reactive({
      item: {}
    })
		/**
		 * 二级分类input 状态变化函数
		 */
		const secCateIsShow = (status) => {
			sec_cate_status.value = status;
		};
		/**
		 * 编辑状态方法
		 */
		const editStatusChange = (status) => {
			editFlag.first = status.first || false;
			editFlag.second = status.second || false;
		};
		/**
		 * 添加一级分类事件处理函数
		 */
		const addFirstCate = () => {
			first_cate_status.value = true;
			resetForm({
        firstCateValue: "",
        secCateValue: ""
      });
			editStatusChange({ first: false });
			secCateIsShow(false);
		};
		/**
		 * 删除一级分类事件处理函数
		 */
		const deleteFirstCate = (firstCateItem) => {
			// console.log(firstCateItem);
			currentCate.item = firstCateItem;
			// console.log(currentCate.item);
			Confirm({
				title: `确认删除分类"${currentCate.item.category_name}"吗？`,
				success: _deleteCategory
			})	
		};
		/**
		 * 删除二级分类事件处理函数
		 */
		const deleteSecCate = (secCateItem) => {
			currentCate.item = secCateItem;
			Confirm({
				title: `确认删除分类"${currentCate.item.category_name}"吗？`,
				success: _deleteCategory
			})
		}
		/**
		 * 删除分类请求
		 */
		const _deleteCategory = async () => {
			let reqData = {
				categoryId: currentCate.item.id,
			};
			const [err, res] = await awaitWrap(deleteCategory(reqData));
			let resData = res.data;
			if (resData.resCode === 0) {
        message.success(resData.message);
				GetCategoryAll();
				first_cate_status.value = false;
			}
		};
		/**
		 * 收起/展开二级分类
		 */
		const toggleCate = () => {
			console.log(1);
		}
		/**
		 * 编辑分类请求
		 */
		const _putCategory = async () => {
			let reqData;
			if(!editFlag.second) {
				reqData = {
					id: currentCate.item.id,
					categoryName: category_form.firstCateValue
				};
			}else {
				reqData = {
					id: currentCate.item.id,
					categoryName: category_form.secCateValue
				};
			}
			const [err, res] = await awaitWrap(putCategory(reqData));
			console.log(res);
			let resData = res.data;
			if(resData.resCode === 0) {
				message.success(resData.message);
				GetCategoryAll();
			}
		}
		/**
		 * 清空表单
		 */
		const resetForm = (options) => {
			category_form.firstCateValue = options.firstCateValue;
			category_form.secCateValue = options.secCateValue;
		};
		/**
		 * 提交分类编辑表单事件处理函数
		 */
		const submitCate = () => {
			// console.log("submit",category_form.firstCateValue);
			if (editFlag.first) {
				//  编辑状态
				if(!editFlag.second){
					Confirm({
						title: `确认修改分类"${currentCate.item.category_name}？"`,
						success: _putCategory
					})				
				}else{
					Confirm({
						title: `确认修改分类"${currentCate.item.category_name}？"`,
						success: _putCategory
					})
				}	
			} else {
				if (editFlag.second) {
          _addChildrenCategory(currentCate.item);
          resetForm({
            firstCateValue:category_form.firstCateValue,
            secCateValue: ""
          });
					return false;
				}
				console.log("提交一级分类");
				_addFirstCategory();
				resetForm({
          firstCateValue: "",
          secCateValue: ""
        });
			}
		};
		/**
		 * 提交一级分类数据请求
		 */
		const _addFirstCategory = async () => {
			const [err, res] = await awaitWrap(
				addFirstCategory({ categoryName: category_form.firstCateValue })
			);
			console.log(res);
			let resData = res.data;
			if (resData.resCode === 0) {
				message.success({
					content: resData.message,
				});
				// 更新列表
				// GetCategoryAll();
				category_data.list.push(resData.data);
			}
		};

		/**
		 * 获取列表信息
		 */
		// const { GetCategoryAll } = useCateData();

		/**
		 * 编辑方法
		 */
		const edit = (cateItem) => {
			currentCate.item = cateItem;
			if(editFlag.first && !editFlag.second){
				first_cate_status.value = true;
				category_form.firstCateValue = cateItem.category_name;
				secCateIsShow(false);
			}else{
				first_cate_status.value = true;
				sec_cate_status.value = true;
				secCateIsShow(true);
        category_data.list.forEach(item => {
				if(item.id === cateItem.parent_id){
						category_form.firstCateValue = item.category_name
					}
				});
				category_form.secCateValue = cateItem.category_name;
			}
		}
		/**
		 * 一级分类编辑事件处理函数
		 */
		const editFirstCate = (firstCateItem) => {
			editStatusChange({
				first: true,
				second: false,
			});
			edit(firstCateItem);
		};
		/**
		 * 二及分类编辑事件处理函数
		 */
		const editSecCate = (secCateItem) => {
			editStatusChange({
				first: true,
				second: true,
			});
			edit(secCateItem);
		}
		/**
		 * 添加子级事件处理函数
		 */
		const addChild = (firstCateItem) => {
      currentCate.item = firstCateItem;
      console.log(currentCate);
			first_cate_status.value = true;
			category_form.firstCateValue = firstCateItem.category_name;
			category_form.secCateValue = "";
			sec_cate_status.value = true;
			editStatusChange({
				first: false,
				second: true,
      });
		};
		/**
		 * 添加子级请求
		 */
		const _addChildrenCategory = async (firstCateItem) => {
			let reqData = {
				categoryName: category_form.secCateValue,
				parentId: firstCateItem.id,
			};
			const [err, res] = await awaitWrap(addChildrenCategory(reqData));
      console.log(res);
      if(res){
        let resData = res.data;
        if(resData.resCode === 0) {message.success(resData.message);};
        GetCategoryAll();
      }
		};
		/**
		 * mounted
		 */
		onMounted(() => {
			GetCategoryAll();
		});
		return {
			//ref
			categoryForm,
			first_cate_status,
			sec_cate_status,
			//reactive
			category_form,
			category_data,
			editFlag,

			//methods
			addFirstCate,
			submitCate,
			editFirstCate,
			addChild,
			deleteFirstCate,
			editSecCate,
			deleteSecCate,
			toggleCate
		};
	},
};
</script>
<style lang="scss" scoped>
.category-wrap {
	&::before {
		margin: 30px -30px 28px -30px;
		content: "";
		display: block;
		border-bottom: 1px solid #f3f3f3;
	}
}
.cate-list {
	position: relative;
	font-size: 14px;
	&::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 20px;
		border-left: 1px dotted #ddd;
	}
	&:first-child {
		&::before {
			top: 20px;
		}
	}
	&:last-child {
		&::before {
			bottom: 20px;
		}
	}
	h4,
	li {
		line-height: 44px;
	}
	.primary-item {
		transition: ease 0.5s all;
		&:hover {
			background-color: #f3f3f3;
		}
		position: relative;
		padding-left: 40px;
		.icon {
			position: absolute;
			font-size: 16px;
			left: 12px;
			top: 14px;
			background-color: #fff;
		}
		.btn-group {
			position: absolute;
			top: 10px;
			right: 0;
			margin-right: 5px;
			button {
				font-size: 12px;
				margin: 0 4px;
			}
		}
	}
	li {
		margin-left: 20px;
		transition: ease 0.5s all;
		&:hover {
			background-color: #f3f3f3;
		}
		position: relative;
		padding-left: 40px;
		.btn-group {
			position: absolute;
			top: 0;
			right: 0;
			margin-right: 5px;
			button {
				font-size: 12px;
				margin: 0 4px;
			}
		}
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 22px;
			width: 32px;
			border-bottom: 1px dotted #ddd;
		}
	}
}

.primary-item-edit {
	h4 {
		line-height: 42px;
		background-color: #f3f3f3;
		padding-left: 22px;
	}
	.form {
		margin-top: 22px;
		margin-left: 22px;
	}
}
</style>
