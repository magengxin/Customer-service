import { sendMsg } from '@/utils/websocket'


/**
 * 3.4.	客服转接会话
 * transferType 转接类型：Workgroup工作组 Agent 客服
 * transferId 工作组ID或者客服ID
 * transferRemark 转接备注
 */
export function transfer({ sessionId, transferId, transferRemark, transferType }) {
  const json = {
    "timestamp": 117832473999,
    "cmd": "TransferSession",
    "data": {
      "sessionId": sessionId,
      "transferType": transferType,
      "transferId": transferId,
      "transferRemark": transferRemark,
    }
  }

  sendMsg(json)
}

/**
 * 3.5.	客服发起会话
 */
export function chat(customerId) {
  const json = {
    "timestamp": 117832473999,
    "cmd": "CreateSession",
    "data": {
      "customerId": customerId
    }
  }

  sendMsg(json)
}