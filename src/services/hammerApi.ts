import axios from 'axios';

const hammerApi = axios.create({
  baseURL: "http://localhost:8001/",
});

class HammerAPI {
  async getImages() {
    return await hammerApi.get("images");
  }

  async deleteImage(id: string) {
    return await hammerApi.delete(`images/${id}`);
  }

  async getContainers() {
    return hammerApi.get("containers");
  }
}

export default new HammerAPI();
