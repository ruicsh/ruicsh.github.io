export async function compress(input: string) {
  const cs = new CompressionStream("deflate");
  const stream = new Blob([input]).stream().pipeThrough(cs);
  const binary = await new Response(stream).arrayBuffer();
  const buffer = Buffer.from(binary);
  const compressed = window.btoa(buffer.toString("base64"));

  return compressed;
}

export async function decompress(input: string) {
  const ds = new DecompressionStream("deflate");
  const buffer = Buffer.from(window.atob(input), "base64");
  const stream = new Blob([buffer]).stream().pipeThrough(ds);
  const decompressed = new Response(stream).text();

  return decompressed;
}
