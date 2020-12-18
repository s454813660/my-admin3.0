<template>
	<div class="info-list">
		<!-- header start -->
		<ListHeader />
    <!-- header end -->

		<!-- table start -->
		<ListTable />
    <!-- table end -->
	</div>
</template>
<script>
import { reactive, ref, computed } from "vue";

import ListHeader from "./listComps/ListHeader"
import ListTable from "./listComps/ListTable"
export default {
	name: "InfoList",
	components: {
    ListHeader,
    ListTable
	},
};
</script>
<style lang="scss" scoped>

</style>
