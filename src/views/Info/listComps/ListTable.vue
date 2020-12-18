<template>
	<div class="table-content">
		<a-table
			:columns="columns"
			:data-source="data"
			:bordered="true"
			:row-selection="rowSelection"
			size="middle"
			:pagination="false"
		>
			<template #operation="{text: operation}">
				<template v-for="(item, index) in operation" :key="item.id">
					<a-button
						style="margin: 0 4px;"
						:type="item === '删除' ? 'danger' : 'default'"
						@click="showModal(index)"
					>
						{{ item }}
					</a-button>
				</template>
			</template>
		</a-table>
		<div class="delete-all">
			<a-button size="large" @click="deleteAll">批量删除</a-button>
		</div>
		<div class="pagination">
			<a-pagination
				v-model:current="paginationStyle.current1"
				v-model:pageSize="paginationStyle.pageSize"
				:total="500"
			>
			</a-pagination>
		</div>
	</div>
	<InfoEdit :editVisible="editVisible" @hideEditModal="hideEditModal" />
</template>
<script>
import { reactive, ref, computed } from "vue";
import { globalComfirm } from "@/libs/utils/global";
import InfoEdit from "./InfoEdit";
export default {
	name: "ListTable",
	components: {
		InfoEdit,
	},
	setup() {
		const editVisible = ref(false);
		const columns = reactive([
			{
				title: "标题",
				dataIndex: "title",
				key: "title",
				width: 830,
				align: "center",
				slots: { customRender: "title" },
			},
			{
				title: "类别",
				dataIndex: "category",
				key: "category",
				align: "center",
				width: 130,
			},
			{
				title: "日期",
				dataIndex: "date",
				key: "date",
				width: 237,
				align: "center",
				ellipsis: true,
			},
			{
				title: "管理人",
				dataIndex: "admin",
				key: "admin",
				width: 115,
				align: "center",
				ellipsis: true,
			},
			{
				title: "操作",
				dataIndex: "operation",
				key: "operation",
				align: "center",
				slots: { customRender: "operation" },
			},
		]);
		const data = reactive([
			{
				key: "1",
				title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
				category: "国内信息",
				date: "2019-09-10 19:31:31",
				admin: "管理员",
				operation: ["删除", "编辑"],
			},
			{
				key: "2",
				title:
					"习近平在中央政协工作会议暨庆祝中国人民政治协商会议成立70周年大会上发表重要讲话",
				category: "国内信息",
				date: "2019-09-10 19:31:31",
				admin: "张三",
				operation: ["删除", "编辑"],
			},
			{
				key: "3",
				title: '基里巴斯与台当局"断交" 系蔡当局上台后断交第7国',
				category: "国内信息",
				date: "2019-09-10 19:31:31",
				admin: "李四",
				operation: ["删除", "编辑"],
			},
			{
				key: "3",
				title: '不选了！纽约市长白思豪宣布退出2020美国大选',
				category: "国内信息",
				date: "2019-09-10 19:31:31",
				admin: "李四",
				operation: ["删除", "编辑"],
			},
		]);
		/**
		 * pagination参数设置
		 */
		const paginationStyle = reactive({
			pageSize: 20,
			current1: 3,
		});

		const rowSelection = computed(() => {
			return {
				// selections:true,
				columnWidth: 45,
			};
    });
		
		/**
		 * 结构出deleteConfirm方法
		 */
		const { deleteConfirm } = globalComfirm();
		/**
		 * 删除所有事件处理函数
		 */
		const deleteAll = () => {
			deleteConfirm({
				title: "确认删除所有？",
				success: deleteAllSuccess
			})
		}
		/**
		 * 删除所有项成功回调函数
		 */
		const deleteAllSuccess = () => {
			console.log("删除全部了");
		}

		/**
		 * 删除当前项成功回调函数
		 */
		const deteleItemSuccess = () => {
			console.log("删除了当前项");
		}

		/**
		 * 编辑/删除展示对话框的事件处理函数
		 */
		function showModal(index) {
			switch (index) {
				case 0:
					console.log("删除");
					deleteConfirm({
						title: "确认删除当前信息？",
						success: deteleItemSuccess,
					});
					break;
				case 1:
					console.log("编辑");
					editVisible.value = true;
					break;
				default:
					break;
			}
		};
		/**
		 * 
		 */
		const hideEditModal = () => {
			editVisible.value = false;
		}
    return {
			editVisible,
      columns,
      data,
      paginationStyle,
			rowSelection,
			
			showModal,
			hideEditModal,
			deleteAll
    }
	},
};
</script>
<style lang="scss" scoped>
.table-content {
  margin: 30px 0 0 0;
  
  .delete-all {
    width: 96px;
    font-size: 14px;
    margin-top: 30px;
    float:left;
    button {
      width: 100%;
    }
  }
  .pagination {
    float: right;
    margin-top: 33px;
  }
}
</style>

