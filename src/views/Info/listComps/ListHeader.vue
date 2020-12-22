<template>
	<a-row :gutter="16">
		<a-col>
			<div class="label-wrap category" style="width:204px">
				<label for="">分类:</label>
				<div class="content-wrap">
					<a-select
						size="large"
						placeholder="请选择"
						label-in-value
						v-model:value="type_value"
						@change="handleChange"
						style="width:100%"
						v-if="category_data.list"
					>
						<a-select-option v-for="type in category_data.list"
														 :key="type.id"
														 :value="type.id">
							{{type.category_name}}
						</a-select-option>
					</a-select>
				</div>
			</div>
		</a-col>
		<a-col>
			<div class="label-wrap date" style="width:444px">
				<label for="">日期：</label>
				<div class="content-wrap">
					<a-range-picker
						size="large"
						:placeholder="['开始日期', '结束日期']"
						style="width:100%"
					>
						<template #suffixIcon><ClockCircleOutlined /></template>
					</a-range-picker>
				</div>
			</div>
		</a-col>
		<a-col>
			<div class="label-wrap key-word">
				<label for="">关键字：</label>
				<div class="content-wrap">
					<a-select
						v-model:value="key_word_value"
						size="large"
						placeholder=""
						style="width:100%"
					>
						<a-select-option value="1">id</a-select-option>
					</a-select>
				</div>
			</div>
		</a-col>
		<a-col>
			<a-input
				v-model:value="search_value"
				placeholder="请输入内容"
				style="height:40px; font-size:14px;"
			/>
		</a-col>
		<a-col>
			<a-button type="danger" size="large" style="width:98px; font-size:14px;margin-right:164px"
				>搜索</a-button
			>
		</a-col>
		<a-col>
			<a-button type="danger" size="large" style="width:98px; font-size:14px"
				@click="showEdit">编辑</a-button
			>
		</a-col>
	</a-row>
	<InfoEdit :editVisible="editVisible" @hideEditModal="hideEditModal"/>
</template>
<script>
import { onMounted, ref, reactive } from "vue";
import { ClockCircleOutlined } from "@ant-design/icons-vue";
import InfoEdit from "./InfoEdit"
import { getCategoryAll } from "@/network/category";
export default {
	name: "ListHeader",
	components:{
    ClockCircleOutlined,
		InfoEdit
  },
  setup() {
    const type_value = ref(undefined);
		const key_word_value = ref("id");
		const search_value = ref("");

		const editVisible = ref(false);

		const category_data = reactive({
			list: []
		})
		const handleChange = (value) => {
			console.log(value);
		}
		
		const showEdit = () => {
			editVisible.value = true;
		}

		const hideEditModal = () => {
			editVisible.value = false;
		}

		const _getCategoryAll = async () => {
			let res = await getCategoryAll();
			console.log(res);
			let resData = res.data.data;
			category_data.list = resData;
		}

		onMounted(() => {
			_getCategoryAll()
		})
    return {
			//ref
      type_value,
			key_word_value,
			search_value,
			editVisible,
			//reactive
			category_data,

			//mothods
			handleChange,
			showEdit,
			hideEditModal
    }
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
	font-size: 14px;
	&.category {
		margin-right: 50px;
		@include labelDom(60, left, 40);
	}
	&.date {
		margin-right: 46px;
		@include labelDom(60, left, 40);
	}
	&.key-word {
		margin-right: 15px;
		width: 156px;
		@include labelDom(70, left, 40);
	}
}
</style>
