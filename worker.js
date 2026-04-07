export default {
  async fetch(request) {

    const url = new URL(request.url)

    if (url.searchParams.get("token") !== "abc123") {
      return new Response("Forbidden", { status: 403 })
    }

    const ua = request.headers.get("User-Agent") || ""

    const allowedUA = [
      "Clash",
      "clash",
      "ClashMeta",
      "ClashforWindows",
      "ClashX",
      "Stash",
      "FiClash"
    ]

    let allowed = false

    for (const a of allowedUA) {
      if (ua.includes(a)) {
        allowed = true
        break
      }
    }

    if (!allowed) {
      return new Response("404 Not Found", { status: 404 })
    }

    const proxies = `
proxies:

- name: proxy1
  type: socks5
  server: 144.48.108.121
  port: 5452

- name: proxy2
  type: http
  server: 144.48.108.122
  port: 5452

`

    return new Response(proxies, {
      headers: {
        "Content-Type": "text/plain"
      }
    })

  }
}
