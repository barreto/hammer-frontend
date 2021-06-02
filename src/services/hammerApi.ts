import axios, { AxiosRequestConfig } from 'axios';

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
    const config: AxiosRequestConfig = { params: { force: true } };
    return await hammerApi.delete(`images/${id}`, config);
  }

  async deleteAllImages() {
    return await hammerApi.post("images/clear");
  }

  async getContainers() {
    return hammerApi.get("containers");
  }

  async createContainer(containerName: string, imageName: string, tag: string) {
    const body = { Image: `${imageName}:${tag}` };
    const config: AxiosRequestConfig = { params: { name: containerName } };
    return hammerApi.post("containers/create", body, config);
  }

  async startContainer(id: string) {
    return hammerApi.post(`containers/${id}/start`);
  }

  async stopContainer(id: string) {
    return hammerApi.post(`containers/${id}/stop`);
  }

  async restartContainer(id: string) {
    return hammerApi.post(`containers/${id}/restart`);
  }

  async deleteContainer(id: string) {
    return hammerApi.delete(`containers/${id}`);
  }

  async deleteAllContainers() {
    return hammerApi.post("containers/clear");
  }
}

export default new HammerAPI();
