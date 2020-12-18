import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from "vue";
export function globalComfirm() {
  const deleteConfirm = function(params) {
    Modal.confirm({
      title: params.title,
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认',
      cancelText: '取消',
      onOk: params.success
    })
  }
  return {
    deleteConfirm
  }
}