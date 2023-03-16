import http from "../http-common";

class FileService {
  getFile(id: number) {
    return http.get(`/file/${id}`);
  }
}

export default new FileService();