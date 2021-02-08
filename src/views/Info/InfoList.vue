<template>
	<div class="info-list">
		<!-- list-header start -->
		<div class="info-header">
			<a-row :gutter="8" type="flex">
				<!-- category -->
				<a-col>
					<div class="category">
						<label for="">分类：</label>
						<div class="content-wrap">
							<a-select v-model:value="categoryId"
												placeholder="请输入"
												style="width:100%"
												size="large"
												:allowClear="true"
												>
								<a-select-option
									:value="item.id"
									v-for="item in category"
									:key="item.id">
										{{item.category_name}}
								</a-select-option>
							</a-select>
						</div>
					</div>
				</a-col>
				<!-- date -->
				<a-col>
					<div class="datePicker">
						<label for="">日期：</label>
						<div class="content-wrap">
							<a-config-provider :locale="locale">
								<a-range-picker size="large"
															 	v-model:value="date"
																valueFormat="YYYY-MM-DD h:mm:ss"></a-range-picker>
							</a-config-provider>	
						</div>
					</div>
				</a-col>
				<!-- keyword -->
				<a-col>
					<div class="keyword">
						<label for="">关键字：</label>
						<div class="content-wrap">
							<SelectComp :selectOptions="keywordSelectOptions" style="width: 100%"/>
						</div>
					</div>
				</a-col>
				<!-- select input -->
				<a-col>
					<a-input size="large" style="width:180px;height: 40px; font-size:16px" placeholder="请输入内容"></a-input>
				</a-col>
				<!-- search button -->
				<a-col>
					<a-button type="danger" size="large" style="width:98px;font-size: 15px"
										@click="searchInfo">搜索</a-button>
				</a-col>
				<!-- addEdit -->
				<a-col flex="auto">
					<a-button type="danger" size="large" class="pull-right"
										@click="showModal">编辑</a-button>
				</a-col>
			</a-row>
		</div>
		<!-- list-header end -->

		<!-- table start -->
		<div class="info-table">
			<a-table :row-selection="rowSelection" 
							 :columns="columns"
							 :data-source="infoData.data"
							 size="middle"
							 bordered
							 :pagination="false"
							 :loading="loading">
				<template #newstitle="{ text }">
					<span>{{ text }}</span>
				</template>
				<template #action="{record}">
					<div class="action">
						<a-button type="danger" @click="deleteItem(record)">删除</a-button>
						<a-button class="ant-btn-success" @click="editItem(record)">编辑</a-button>
						<a-button class="ant-btn-success" @click="editDetail(record)">编辑详情</a-button>
					</div>
				</template>	
			</a-table>
			<div class="table-footer">
				<div class="delete-all">
					<a-button>删除所有</a-button>
				</div>
				<div class="pagination">
					<a-pagination v-model:current="paginationOptions.current"
												v-model:pageSize="paginationOptions.pageSize"
												:total="paginationOptions.total"
												@change="paginationOptions.onChange"
												></a-pagination>
				</div>
			</div>
		</div>
		<!-- table end -->
		<infoEdit :modalVisible="modalVisible"
							@hideModal="hideModal"
							:category="categoryData"
							:currentItem="currentItem"
							@commit="GetList"
							:editFlag="editFlag" />
	</div>
</template>
<script>
import SelectComp from "@/components/common/Select"
import { reactive, ref, computed, onMounted, watch, toRefs } from "vue";
//国际化配置 中文
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
//公用分类数据获取
import { useCateData } from "@/network/common";
//api
import { getList, deleteInfo } from "@/network/info";
//引入编辑对话框组件
import infoEdit from "./listComps/infoEdit";
// format
import { formatDate } from "@/libs/utils/common"
//useComfirm
import { useConfirm } from "@/libs/utils/useConfirm";
import { message } from 'ant-design-vue';
// router
import { useRouter } from "vue-router";
export default {
	name: "InfoList",
	components: {
		infoEdit,
		SelectComp
	},
	setup() {
		const keywordSelectOptions = reactive({
      value: undefined,
      options: [
        { type: "title", label: "标题"},
        { type: "manager", label: "管理员"},
      ],
      allowClear: true,
      size: "large",
      placeholder: "请输入"
    });
		// router
		const router = useRouter();
		console.log(router);
		//data
		const data = reactive({
			loading: true,
			categoryId: undefined,
			date: [],
			modalVisible: false,
			category: [],
			currentItem: {},
			editFlag: ""
		})
		const { categoryData, GetCategoryAll } = useCateData()

		const { Confirm } = useConfirm();
		//locale
		const locale = zhCN;
		//table columns configuration
		const columns = reactive([
			{
				title: '标题',
				dataIndex: 'title',
				key: 'title',
				align: "center",
				width: 730,
				slots: { customRender: 'newstitle' },
			},
			{
				title: '类别',
				dataIndex: 'categoryName',
				key: 'categoryName',
				align: "center",
				width: 130,
			},
			{
				title: '日期',
				dataIndex: 'createDate',
				key: 'createDate',
				align: "center",
				width: 237,
			},
			{
				title: '管理员',
				dataIndex: 'admin',
				key: 'admin',
				align: "center",
				width: 115,
			},
			{
				title: '操作',
				dataIndex: 'action',
				key: 'action',
				align: "center",
				width: 287,
				slots: {customRender: "action"}
			},
		]);
		/**
		 * table selection
		 */
		const rowSelection = reactive({
			columnWidth: 45
		})
		/**
		 * table paginationOptions
		 */
		const paginationOptions = reactive({
			current: 1,
			pageSize: 10,
			total: 20,
			onChange: (res) => {
				paginationOptions.current = res;
				GetList();
			}
		})
		/**
		 * table data
		 */
		const infoData = reactive({
			data: []
		});

		/**
		 * method
		 */
		// formatCategoryName 
		const formatCategoryName = (id) => {
			let name = ""
			for(let item in categoryData.list) {
				if(categoryData.list[item].id === id) {
					return categoryData.list[item].category_name
				}
			}
			return name
		}
		/**
		 * bindEvent 
		 */
		/* header event */
		// search
		const searchInfo = () => {
			let data = {
				categoryId: data.categoryId,
				startTiem: data.date[0],
				endTime: data.date[1],
				title: data.title,
				id: data.id,
				pageNumber: paginationOptions.current,
				pageSize: paginationOptions.pageSize
			}
			GetList({data})
		}
		// addEdit
		const showModal = () => {
			data.modalVisible = true;
			data.currentItem = {}
			data.editFlag = "add"
		}


		/**table event */
		/**
		 * deleteItem 删除当前选项
		 */
		const deleteItem = (record) => {
			console.log(record);
			data.currentItem = record;
			Confirm({
				title: "是否删除当前项",
				success: DeteleInfo
			})
		}
		// editItem 编辑当前选项
		const editItem = (record) => {
			data.modalVisible = true;
			data.currentItem = record;
			data.editFlag = "put"
		}
		//  editDetail 编辑详情
		const editDetail = (record) => {
			// data.currentItem = record;
			let id = record.id;
			sessionStorage.setItem("infoId", id);
			// console.log(record);
			router.push({
				name: "DetailEdit",
				params: { id }
			})
		}
		/* customize event (自定义事件) */ 
		const hideModal = () => {
			data.modalVisible = false;
		}
		//watch
		watch(() => categoryData.list, () => {
			data.category = categoryData.list
		})

		// getData
		const GetList = (params) => {
			let reqData = {
				categoryId: params? params.data.categoryId : "",
				startTiem: params? params.data.startTiem : "",
				endTime: params? params.data.endTime : "",
				title: params? params.data.title : "",
				id: params? params.data.id : "",
				pageNumber: paginationOptions.current,
				pageSize: paginationOptions.pageSize
			}
			params = {
				method: "post",
				url: "/news/getList/",
				data: reqData
			}
			getList(params).then(res => {
				let resData = res.data.data;
				resData.data.forEach(item => {
					item.key = item.id;
					item.categoryName = formatCategoryName(item.categoryId)
					item.createDate = formatDate(item.createDate*1, "Y-M-D h:m:s")
				});
			infoData.data = resData.data;
			paginationOptions.total = resData.total;
			data.loading = false;
			}).catch(err=> {})
		}
		//
		const DeteleInfo = () => {
			let reqData = {
				id: [data.currentItem.id]
			};
			deleteInfo(reqData).then(res => {
				let resData = res.data;
				if(resData.resCode === 0) {
					message.success(resData.message);
					GetList();
				}
			})
		}
		//mounted
		onMounted(() => {
			GetCategoryAll();
			GetList()
		})
		return {
			keywordSelectOptions,
			//本地话配置
			locale,
			//table 配置
			rowSelection, columns, paginationOptions,
			//table data
			infoData,
			//data
			...toRefs(data),
			categoryData,
			//bindEvent
			searchInfo, showModal, hideModal, editItem, deleteItem, editDetail,
			GetList
		}
	}
};
</script>
<style lang="scss" scoped>
.info-header {
	font-size: 15px;
	.category {
		width: 220px;
		margin-right: 44px;
		@include labelDom(60, left, 40);
	}
	.datePicker{ 
		width: 460px;
		margin-right: 35px;
		@include labelDom(60, left, 40);
	}
	.keyword {
		width: 172px;
		@include labelDom(70, left, 40);
	}
}
.info-table {
	margin-top: 30px;
	.action {
		button {
			margin: 0 6px;
		}
	}
	.table-footer {
		.delete-all {
			float: left;
			margin-top: 30px;
			button {
				width: 96px;
				height: 38px;
			}
		}
		.pagination {
			float: right;
			margin-top: 32px;
		}
	}
}
</style>
