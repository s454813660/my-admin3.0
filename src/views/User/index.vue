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
					>新增</a-button
				>
			</a-col>
		</a-row>
		<TableComp class="user-table" :tableOptions="tableOptions">
      <template #allowed>
        <a-switch></a-switch>
      </template>
      <template #action="{record}">
        <div class="btn-group">
          <a-button type="danger" @click="deleteItem(record)">删除</a-button>
          <a-button class="ant-btn-success">编辑</a-button>
        </div>
      </template>
    </TableComp>
	</div>
</template>
<script>
// 引入组件
import SelectComp from "@/components/common/Select";
import TableComp from "@/components/common/Table";
import { reactive } from "vue";
export default {
	name: "User",
	components: {
		SelectComp,
		TableComp,
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
        url: "/news/getList/",
        method: "post",
      }
    });
    
		const data = reactive({
      searchValue: "",
		});

    const deleteItem = (record) => {
      console.log(record);
    }
		return {
      selectOptions,
      tableOptions,
      data,
      deleteItem
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
