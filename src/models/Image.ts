export default interface Image {
  name: string;
  tag: string;
  containers: number;
  created: number;
  id: string;
  repoTags: string[];
  pulledVersions: string;
  size: number;
  virtualSize: number;
}
