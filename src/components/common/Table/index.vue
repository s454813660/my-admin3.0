<template>
	<div>
		<a-table
			:row-selection="tableOptions.rowSelection"
			:data-source="data.tableData"
			:size="tableOptions.size"
			:bordered="tableOptions.bordered"
			:pagination="false"
			:loading="data.loading"
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
		<div class="user-table-footer">
			<a-row>
				<a-col :span="4">
					<slot name="deleteall"></slot>
				</a-col>
				<a-col :span="20">
					<slot name="pagination"></slot>
					<!-- <a-pagination v-if="tableOptions.isPaginationShow"
										showSizeChanger
										:total="data.total"
										v-model:current="data.current"
										v-model:pageSize="data.pageSize"
										@change="handlePageTurning"
										class="pull-right"></a-pagination> -->
				</a-col>
			</a-row>
		</div>
	</div>
</template>
<script>
// 引入组件
// import Table from "ant-design-vue/lib/table";
// import "ant-design-vue/lib/table/style/index";
import { onBeforeMount, reactive, watch } from "vue";
import { useUserData } from "@/network/useUserData";
import api from "@/network/api";
export default {
	name: "Table",
	// components: { Table },
	props: {
		tableOptions: {
			type: Object,
			default: () => {},
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		// 公共数据
		const { userData, GetUserList } = useUserData();
		const tableOptions = reactive({
			rowSelection: {},
			columns: [],
			bordered: true,
      size: "default",
			isPaginationShow: false,
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
			tableData: [],
			total: 0,
			current: 1,
			pageSize: 10,
			loading: true
		});

		/**
		 * 获取数据
		 */
		const getTableData = () => {
			let requestOptions = tableOptions.requestOptions;
			const reqParams = {
				url: api[requestOptions.requestUrl],
				method: "post",
				data: requestOptions.data
			};
			GetUserList(reqParams)
		}
		/**
		 * 翻页操作事件处理函数
		 */
		const handlePageTurning = (page) => {
			data.current = page;
		}
		/**
		 * watch
		 */
		watch([ () => userData.data,
						() => userData.loading
			], ([newdata, loading]) => {
			data.tableData = Array.prototype.slice.call(newdata).map(item => {
				item.key = item.id;
				item.status = item.status == "1"? false : true;
				return item
			});
			data.loading = loading;
		});
		onBeforeMount(() => {
			initTableOptions();
			getTableData();
		});
		return {
			tableOptions,
			userData,
			data,
			handlePageTurning,
			getTableData
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
<style scoped lang="scss">
.user-table-footer {
	margin-top: 15px;
}
</style>
