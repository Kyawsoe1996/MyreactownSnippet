
import axios from "../axios";
class BlogPostDataService {
   getAllUsers() {
        return axios.get("/account/users/")
    
   
  }
 
  creteUser(x) {
      return axios.post("/account/users/",x);
    }
  
  

//   get(id) {
//     return httpCommon.get(`/tutorials/${id}`);
//   }

//   create(data) {
//     return httpCommon.post("/tutorials", data);
//   }

//   update(id, data) {
//     return httpCommon.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return httpCommon.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return httpCommon.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return httpCommon.get(`/tutorials?title=${title}`);
//   }
}

export default new BlogPostDataService();