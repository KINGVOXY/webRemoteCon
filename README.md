# Puddle Starter Kit

- deno 1.16.1
- typescript 4.4.2

## 構成(tree)
<pre>
.
├── README.md
├── config
│   ├── .env
│   └── routes.ts
├── controllers
│   └── home_controller.ts
├── deps.ts
├── server.ts
└── views
    ├── assets
    │   ├── images
    │   │   └── logo.png
    │   ├── scripts
    │   └── styles
    │       └── welcome.css
    └── home
        └── welcome.html
</pre>

## 使用方法 (how to use)

1. コントローラーの作成(create a controller)

    create (./controllers/)
    ```sh
    foge_controller.ts
    ```

    add (./controllers/mod.ts)
    ```ts
    export * from "./foge_controller.ts";
    ```
2. routes.tsへ追記(add to routes.ts)


## 起動方法 (how to run)

```bash
deno run --allow-net --allow-read --allow-write server.ts
```
