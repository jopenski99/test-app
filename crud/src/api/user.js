import { dummy } from "boot/axios";
import {Store} from 'src/store/index'
export default {
  async getTasks() {
    let return_data = [];
    await dummy.get("/todos/user/"+Store.state.user.user.id).then((response) => {
      /*     console.log(response); */
      return_data = response;
    });

    return return_data.data;
  },
};
