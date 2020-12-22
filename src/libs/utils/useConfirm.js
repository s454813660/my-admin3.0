import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from "vue";
export function useConfirm() {
  const Confirm = function(params) {
    Modal.confirm({
      title: params.title,
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认',
      cancelText: '取消',
      onOk: params.success
    })
  }
  return {
    Confirm
  }
}