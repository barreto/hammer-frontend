export default interface Container {
  id: string;
  tag: string;
  image: string;
  networkMode: string;
  command: string;
  status: string;
}
