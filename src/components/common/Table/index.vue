<template>
	<div>
		<a-table
			:row-selection="tableOptions.rowSelection"
			:data-source="data.tableData"
			:size="tableOptions.size"
			:bordered="tableOptions.bordered"
			:pagination="false"
			:loading="tableOptions.loading"
		>
			<template v-for="item in tableOptions.columns">
				<a-table-column
					v-if="item.slot"
					:key="item.key || item.dataIndex"
					:title="item.title"
					:data-index="item.dataIndex || item.key"
					:align="item.align"
					:width="item.width"
				>
					<template #default="{record}">
						<slot :name="item.slot" :record="{ record }"></slot>
					</template>
				</a-table-column>
				<a-table-column
					v-else
					:key="item.key || item.dataIndex"
					:title="item.title"
					:data-index="item.dataIndex || item.key"
					:align="item.align"
					:width="item.width"
				>
				</a-table-column>
			</template>
		</a-table>
		<a-pagination></a-pagination>
	</div>
</template>
<script>
// 引入组件
// import Table from "ant-design-vue/lib/table";
// import "ant-design-vue/lib/table/style/index";

import { onBeforeMount, reactive } from "vue";

import { useInfoData } from "@/network/useInfoData";
export default {
	name: "Table",
	// components: { Table },
	props: {
		tableOptions: {
			type: Object,
			default: () => {},
		},
	},
	setup(props) {
		console.log(props);

		const { infoData, GetList } = useInfoData();
		const tableOptions = reactive({
			rowSelection: {},
			columns: [],
			bordered: true,
			loading: false,
      size: "default",
			paginationOption: {},
			requestOptions: {}
		});

		const initTableOptions = () => {
			let keyArr = Object.keys(tableOptions);
			let propsKeyArr = Object.keys(props.tableOptions);
			for (let key of keyArr) {
				// if(propsKeyArr.includes(key))
				if (propsKeyArr.indexOf(key) !== -1) {
					tableOptions[key] = props.tableOptions[key];
				}
			}
		};
		const data = reactive({
			tableData: [
				{
					key: "1",
					username: "John Brown",
					name: "John",
					phone: "13588888888",
					address: "New York No. 1 Lake Park",
					role: "张三",
				},
				{
					key: "2",
					username: "Joe Black",
					name: "Joe",
					phone: "13588888888",
					address: "London No. 1 Lake Park",
					role: "李四",
				},
				{
					key: "3",
					username: "Jacky Brown",
					name: "Jacky",
					phone: "13588888888",
					address: "London No. 1 Lake Park",
					role: "王五",
				},
			],

		});

		onBeforeMount(() => {
			initTableOptions();
		});
		return {
			tableOptions,
			data,
		};
	},
};

/**
 * @options 属性参考ant-design 官方文档
 *  {
			rowSelection: {},
			columns: [],
			bordered: true,
      loading: false,
      size: "default"
    }

  * @columns
    [
      title: "操作", 当前列的标题
      dataIndex: "action",  当前列的key 如果没有这个选项要设置key
      align: "center",  是否居中 
      width: 100, 宽度
      slot: "action"
    ]
    列表配置中的插槽使用
      <template #action="{record}">
        {{record}}
      </template>
 */
</script>
<style scoped></style>
