
export const enum HTTP_METHOD {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}


export const enum CRUD {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'edit',
    DELETE = 'delete',
}

export const enum MODAL_BUTTON_ACTION {
    SAVE = '儲存',
    CLEAR = '清除',
    CLOSE = '關閉',
    CONFIRM = '確認'
}


export const enum COMMON {
    /**
     * rename token -> token2,
     * prevent duplicate token key in same ccsp website,
     * This website will be embedded into ccsp website
     */
    TOKEN2 = 'token2',

}

export const enum API {
    ACCOUNT = '/accounts'
}

export const enum RET_RESPONSE {
    VERSION = 'Version',
    RETCODE = 'RetCode',
    RETMSG = 'RetMsg',
    TOTAL_RECORDS = 'TotalRecords',
    RETCOUNT = 'RetCount',
    RETRESULT = 'RetResult'
}

export const enum RETCODE {
    SUCCESS = '00',
    FAIL = '90'
}

export const enum ALERT_MSG_TITLE {
    DELETE_MULTI = '刪除多筆資料',
    DELETE_SINGLE = '刪除資料',

    PAGING_NO_PREVOUS = '無上一頁',
    PAGING_NO_NEXT = '無下一頁',

    /** 找不到資料 */
    GET_RET_COUNT_0 = '找不到資料',
    /** 未授權 */
    UNAUTHORIZED_401 = '未授權',
    /** 找不到檔案 */
    DOWNLOAD_FILE_NOT_FOUND_404 = '找不到檔案',
    /** 匯出檔案失敗 */
    EXPORT_FAILED_400 = '匯出失敗(找不到要查詢的資料)'
}


