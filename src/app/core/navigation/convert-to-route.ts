export function convertToRoute(link: Array<any>): string {
  return link.slice(1).join('/');
}
