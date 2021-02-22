<template>
	<div id="user">
		<!-- user-header start -->
		<a-row class="user-header" type="flex">
			<a-col class="keyword">
				<label class="pull-left">关键字：</label>
				<div class="content-wrap">
					<SelectComp :selectOptions="selectOptions" style="width: 100%" />
				</div>
			</a-col>
			<a-col class="search-input">
				<a-input
					placeholder="请输入"
					v-model:value="data.searchValue"
					style="fontSize: 15px;height: 40px"
				></a-input>
			</a-col>
			<a-col class="search-btn">
				<a-button type="danger" size="large">搜索</a-button>
			</a-col>
			<a-col flex="auto">
				<a-button type="danger" size="large" style="float:right;width: 98px"
									@click="openModal">添加用户</a-button
				>
			</a-col>
		</a-row>
		<!-- user-header end -->

		<!-- userTabel start -->
		<TableComp ref="user_table" class="user-table" 
							:tableOptions="tableOptions"
							:loading="data.loading">
			<template #allowed="{record}">
				<a-switch v-model:checked="record.record.status" @change="(val)=> handleChangeStatus(val, record.record)"></a-switch>
			</template>
			<template #action="{record}">
				<div class="btn-group">
					<a-button type="danger" @click="deleteItem(record)">删除</a-button>
					<a-button class="ant-btn-success" @click="editItem(record)">编辑</a-button>
				</div>
			</template>
			<template #deleteall>
				<a-button @click="deleteAll">批量删除</a-button>
			</template>
			<template #pagination>
				<a-pagination class="pull-right"></a-pagination>
			</template>
		</TableComp>
		<!-- userTabel end -->

		<!-- userEdit start -->
		<UserEdit :isModalShow="data.isModalShow"
							@closeEdit="closeEdit"
							@AddUser="AddUser"
							:user="data.currentUser" />
		<!-- userEdit end -->
	</div>
</template>
<script>
// 引入组件
import SelectComp from "@/components/common/Select";
import TableComp from "@/components/common/Table";
import UserEdit from "./comps/UserEdit"
import { onBeforeMount, reactive, ref, watch } from "vue";
import { deleteUser, statusActive } from "@/network/user";
import { useConfirm } from "@/libs/utils/useConfirm";

import {message} from "ant-design-vue";
export default {
	name: "User",
	components: {
		SelectComp,
		TableComp,
		UserEdit
	},
	setup() {		
		// 获取table的ref
		const user_table = ref(null)
		// 获取Comfirm
		const { Confirm } = useConfirm();
		// 选择框配置
		const selectOptions = reactive({
			value: undefined,
			placeholder: "请选择",
			size: "large",
			options: [
				{ type: "phone", label: "手机" },
				{ type: "name", label: "姓名" },
			],
			allowClear: true,
		});
		// table配置
		const tableOptions = reactive({
			columns: [
				{
					title: "邮箱/用户名",
					dataIndex: "username",
					key: "username",
          align: "center",
          width: 300,
				},
				{
					title: "真实姓名",
					dataIndex: "truename",
					key: "truename",
					align: "center",
				},
				{
					title: "手机号",
					dataIndex: "phone",
					key: "phone",
					align: "center",
				},
				{
					title: "地区",
					dataIndex: "region",
					key: "region",
					align: "center",
					width: 300
				},
				{
					title: "角色",
					dataIndex: "role",
					key: "role",
					align: "center",
        },
        {
          title: "禁启用状态",
          dataIndex: "allowed",
          align: "center",
          slot: "allowed",
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          slot: "action",
        },
      ],
      bordered: true,
      rowSelection: {
        columnWidth: 45,
				onChange(keys, rows) {
					data.userId = rows.map(item => item.id)
				}
      },
			requestOptions: {
				requestUrl: "getUserList",
				data: {
					pageNumber: 1,
					pageSize: 10
				}
			},
			isPaginationShow: true,
    });
    
		const data = reactive({
      searchValue: "",
			status: false,
			isModalShow: false,
			userFormData: {},
			userId: [],
			userTableData: [],
			loading: true,
			currentUser: {}
		});

		
		/**
		 * 删除项方法
		 */
		const DeleteUser = () => {
			let reqData = {
				id: data.userId
			}
			deleteUser(reqData).then(res => {
				let resData = res.data;
				if(resData.resCode === 0) {
					message.success(resData.message);
					refreshData();
				}
			})
		};
		/**
		 * 用户禁启用方法
		 */
		const handleStatusActive = (val, record) => {
			let reqData = {
				id: record.id,
				status: val === true? "2" : "1"
			}
			statusActive(reqData).then(res => {
				if(res.data.resCode === 0) {
					message.success(res.data.message);
					refreshData();
				}
			})
		}
		/**
		 * 取消禁启用修改回调
		 */
		const cancelStatusActive = () => {
			refreshData();
		}
		/**
		 * 更新表格数据
		 */
		const refreshData = () => {
			user_table.value.getTableData();
		}
 		/**
		 * 删除当前项事件处理函数
		 */
    const deleteItem = (record) => {
			data.userId = [record.record.id]
			Confirm({
				title: "是否删除当前项？",
				success: DeleteUser,
				
			})
    };
		/**
		 * 编辑当前项时间处理函数
		 */
		const editItem = (record) => {
			openModal();
			data.currentUser = record.record
		}
		/**
		 * 删除选中项事件处理函数
		 */
		const deleteAll = () => {
			if(data.userId.length > 0){
				Confirm({
					title: "是否删除选中项？",
					success: DeleteUser
				})
			}else {
				message.warn("请选择你要删除的项！")
			}
		};

		/**
		 * 改变状态事件处理函数
		 */
		const handleChangeStatus = (val, record) => {
			Confirm({
				title: "确认修改状态吗？",
				success: () => handleStatusActive(val, record),
				cancel: cancelStatusActive
			});
			
		}
		/**
		 * openModal 打开对话框事件处理函数
		 */
		const openModal = () => {
			data.isModalShow = true;
			data.currentUser = {}
		}
		/**
		 * 接受自定义事件
		 */
		/**
		 * closeModal 关闭对话框
		 */
		const closeEdit = (val) => {
			data.isModalShow = val
		}
		/**
		 * 接收添加user的自定义事件，调用更新table视图
		 */
		const AddUser = () => {
			// getTableData();
			refreshData();
		};
		
		return {
			user_table,
      selectOptions,
      tableOptions,
      data,
      deleteItem,
			editItem,
			openModal,
			closeEdit,
			AddUser,
			deleteAll,
			handleChangeStatus
		};
	},
};
</script>
<style scoped lang="scss">
.user-header {
	label {
		font-size: 14px;
	}
	.keyword {
		width: 236px;
		margin-right: 16px;
		@include labelDom(75, left, 40);
	}
	.search-input {
		width: 180px;
		margin-right: 16px;
	}
	.search-btn {
		width: 90px;
		button {
			width: 100%;
		}
	}
}
.user-table {
  margin-top: 30px;
  .btn-group {
    button {
      margin: 0 6px;
    }
  }
}
</style>
