<template>
	<div id="user">
		<!-- user-header -->
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
		<TableComp class="user-table" :tableOptions="tableOptions">
      <template #allowed>
        <a-switch @change="isBanned"></a-switch>
      </template>
      <template #action="{record}">
        <div class="btn-group">
          <a-button type="danger" @click="deleteItem(record)">删除</a-button>
          <a-button class="ant-btn-success">编辑</a-button>
        </div>
      </template>
    </TableComp>
		<UserEdit :isModalShow="data.isModalShow"
							@closeEdit="closeEdit" />
	</div>
</template>
<script>
// 引入组件
import SelectComp from "@/components/common/Select";
import TableComp from "@/components/common/Table";
import UserEdit from "./comps/UserEdit"
import { onBeforeMount, reactive } from "vue";
export default {
	name: "User",
	components: {
		SelectComp,
		TableComp,
		UserEdit
	},
	setup() {
		
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
					dataIndex: "name",
					key: "name",
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
					dataIndex: "address",
					key: "address",
					align: "center",
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
      },
			requestOptions: {
				requestUrl: "getUserList",
				data: {
					pageNumber: 1,
					pageSize: 10
				}
			}
    });
    
		const data = reactive({
      searchValue: "",
			status: "",
			isModalShow: false,
			userFormData: {}
		});

		/**
		 * 禁/启用事件处理函数
		 */
		const isBanned = (status) => {
			switch(status) {
				case true:
					data.status = 2;
					break;
				case false:
					data.status = 1;
					break;
				default:
					break;
			}
			// console.log(data.status);
		}
 		/**
		 * 删除当前项事件处理函数
		 */
    const deleteItem = (record) => {
      console.log(record);
    }
		/**
		 * openModal 打开对话框事件处理函数
		 */
		const openModal = () => {
			data.isModalShow = true;
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
		onBeforeMount(() => {
			// GetUserList({
			// 	pageNumber: 1,
			// 	pageSize: 10
			// })
		})
		return {
      selectOptions,
      tableOptions,
      data,
      deleteItem,
			isBanned,
			openModal,
			closeEdit
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
