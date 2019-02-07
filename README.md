# Task

Write the REST API microservice with the following methods:

- [x] `GET /api/test/ping` - return`{ "data": "pong", "meta": { "handlingTime": 123 } }`, where `meta.handlingTime` is the recording time in milliseconds.
- [ ] `POST /api/file/{name_file}` - upload file, encrypt, save to `./files/{file_name}`.
- [ ] `GET /api/file/{filename}` - download the file saved in `./files/{file_name}`.
- [ ] `* /api/redirect/{url}` is a redirect to `{url}`.
- [ ] `* /api/proxy/{url}` - proxy on `{url}`.

# Details

Use a vanilla JS. Encryption keys stored in config. Architecture & code - for the owner of the desire.

# Deploy

1. Build:

```
docker build --rm -t <your-name>/kitsoft-test-task .
```

2. Run:

```
docker run --rm -p 6000:6000 <your-name>/kitsoft-test-task
```
