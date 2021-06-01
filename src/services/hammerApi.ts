import axios from "axios";

const hammerApi = axios.create({
  baseURL: "http://localhost:8001/",
});

class HammerAPI {
  async getImages() {
    return await hammerApi.get("images");
  }

  async pullImage(fromImage: string, tag: string) {
    const body = { fromImage, tag };
    return await hammerApi.post("images/create", body);
  }

  async deleteImage(id: string) {
    return await hammerApi.delete(`images/${id}`);
  }

  async deleteAllImages() {
    return await hammerApi.post("images/clear");
  }

  async getContainers() {
    return hammerApi.get("containers");
  }
}

export default new HammerAPI();
