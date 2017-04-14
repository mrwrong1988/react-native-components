/**
 * Created by wangyu on 2017/3/28.
 */
export default Err = {
    getDesc(e) {
        if (e && e.data && typeof e.data.description === 'string'&& e.data.description.length>0) {
            return e.data.description;
        } else {
            return JSON.stringify(e);
        }
    }
};