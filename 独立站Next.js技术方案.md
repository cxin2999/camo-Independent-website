# 迷彩毛毡魔术贴材料外贸独立站 Next.js 技术方案

## 1. 文档目标

本文档用于指导迷彩毛毡魔术贴材料外贸独立站的开发、代码托管和线上部署。

计划技术路线：

- 前端框架：Next.js
- 开发语言：TypeScript
- UI 样式：Tailwind CSS
- 代码托管：GitHub
- 部署平台：Vercel
- 网站类型：B2B 外贸展示站 + 询盘转化站

网站不做在线下单、购物车、支付和会员系统。第一阶段重点是把产品、应用、工厂实力、定制能力和询盘入口做好。

## 2. 建站目标

### 2.1 业务目标

- 面向海外 B2B 客户展示迷彩毛毡魔术贴材料
- 明确表达我们销售材料，不销售成品战术装备
- 展示产品分类、材料参数、应用场景和定制能力
- 展示工厂实力，增强采购商信任
- 通过表单、邮箱、WhatsApp 获取询盘
- 为后续 SEO 内容建设打基础

### 2.2 技术目标

- 页面加载快，适合海外访问
- SEO 结构清晰，支持后续关键词增长
- 内容可维护，后续方便新增产品、应用、文章
- 图片资源有统一管理方式
- 表单提交稳定，有基础反垃圾机制
- GitHub 推送后自动触发 Vercel 部署
- 支持预览环境和正式环境分离

## 3. 技术栈选择

### 3.1 核心技术

| 模块 | 选择 | 说明 |
| --- | --- | --- |
| Web 框架 | Next.js App Router | 适合静态页面、SEO、服务端能力和 Vercel 部署 |
| 语言 | TypeScript | 提高组件、数据结构、表单字段的可靠性 |
| 样式 | Tailwind CSS | 快速实现响应式页面和统一设计系统 |
| 组件组织 | 自建组件 | 当前网站偏展示和询盘，不需要引入重型 UI 框架 |
| 图标 | lucide-react | 轻量、统一、适合 B2B 网站 |
| 表单校验 | Zod | 统一前后端字段校验 |
| 表单处理 | Server Actions 或 Route Handler | 第一阶段推荐 Server Actions，复杂上传时可用 Route Handler |
| 邮件服务 | Resend 或企业 SMTP | 用于把询盘发送到业务邮箱 |
| 文件上传 | Vercel Blob 或暂不开放上传 | 如果询盘需要上传样品图，可接 Vercel Blob |
| 部署 | Vercel | 与 Next.js 集成成熟，支持 GitHub 自动部署 |

### 3.2 推荐版本策略

开发时使用 Next.js 当前稳定版本，不在技术方案中锁死具体版本号。初始化项目时使用：

```bash
npx create-next-app@latest
```

推荐初始化选项：

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- src directory: Yes
- Import alias: `@/*`

## 4. 整体架构

网站采用 Next.js 单体架构：

```text
Browser
  |
  | 访问页面 / 提交询盘
  v
Next.js App Router
  |
  | 静态页面、SEO metadata、图片优化、表单处理
  v
Vercel Hosting + Functions
  |
  | 发送邮件 / 存储上传附件 / 记录询盘
  v
Email Service / Vercel Blob / Future CRM
```

第一阶段不引入数据库。询盘通过邮件发送给业务邮箱，并可选将附件上传到 Vercel Blob。

后续如果询盘量变大，可增加：

- Supabase：存储询盘数据
- Airtable / Notion：轻量 CRM
- HubSpot：外贸客户线索管理
- Sanity / Payload CMS：产品和文章内容管理

## 5. 页面规划

### 5.1 第一阶段页面

| 页面 | 路由 | 页面类型 | 主要目标 |
| --- | --- | --- | --- |
| Home | `/` | 静态营销页 | 说明产品、工厂、应用和询盘入口 |
| Products | `/products` | 产品中心 | 展示产品分类、参数和定制能力 |
| Product Detail | `/products/[slug]` | 产品详情 | 具体材料详情、参数、图片和询盘 CTA |
| Applications | `/applications` | 应用场景 | 按战术装备、贴章、制服、头盔套、狩猎装备展示用途 |
| Customization | `/customization` | 定制能力 | 展示可定制项目和定制流程 |
| Factory | `/factory` | 工厂实力 | 展示车间、设备、仓库、质检和产能 |
| About Us | `/about` | 关于我们 | 说明工厂定位、产品和合作方式 |
| Contact | `/contact` | 询盘页 | 完整询盘表单和联系方式 |

### 5.2 第二阶段页面

| 页面 | 路由 | 用途 |
| --- | --- | --- |
| Blog | `/blog` | SEO 内容入口 |
| Blog Detail | `/blog/[slug]` | 行业文章 |
| FAQ | `/faq` | 回答 MOQ、样品、定制、交期等问题 |
| Downloads | `/downloads` | 产品目录、参数表下载 |
| Case Studies | `/case-studies` | 应用案例或材料解决方案 |

## 6. 推荐目录结构

```text
camo-independent-website/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      sitemap.ts
      robots.ts
      products/
        page.tsx
        [slug]/
          page.tsx
      applications/
        page.tsx
      customization/
        page.tsx
      factory/
        page.tsx
      about/
        page.tsx
      contact/
        page.tsx
      api/
        inquiry/
          route.ts
    components/
      layout/
        Header.tsx
        Footer.tsx
        MobileNav.tsx
        StickyInquiryBar.tsx
      sections/
        Hero.tsx
        ProductHighlights.tsx
        PatternSwatches.tsx
        ApplicationsGrid.tsx
        FactoryStats.tsx
        InquirySection.tsx
      ui/
        Button.tsx
        Container.tsx
        SectionHeader.tsx
        Input.tsx
        Textarea.tsx
        Select.tsx
        Badge.tsx
        Card.tsx
      forms/
        InquiryForm.tsx
        QuickInquiryForm.tsx
    content/
      products.ts
      applications.ts
      patterns.ts
      factory.ts
      site.ts
      faq.ts
    lib/
      inquiry/
        schema.ts
        send-email.ts
      seo/
        metadata.ts
      utils.ts
    assets/
      images/
        products/
        factory/
        applications/
        patterns/
  public/
    images/
    favicon.ico
    og-image.jpg
  docs/
  .env.example
  next.config.ts
  package.json
  README.md
```

## 7. 内容管理方案

### 7.1 第一阶段：代码内结构化内容

第一版建议不接 CMS，直接使用 TypeScript 文件管理内容。

原因：

- 页面数量有限
- 产品分类相对稳定
- 有利于快速上线
- 维护成本低
- SEO 和构建性能更可控

示例内容文件：

```text
src/content/products.ts
src/content/applications.ts
src/content/patterns.ts
src/content/site.ts
```

### 7.2 产品数据结构建议

```ts
export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  images: string[];
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  applications: string[];
  customOptions: string[];
};
```

### 7.3 后续 CMS 升级

如果后续需要非技术人员频繁更新产品、文章和图片，可升级为：

- Sanity：适合内容和图片管理
- Payload CMS：适合自托管和高度定制
- Strapi：适合传统后台管理

第一版不建议过早引入 CMS。

## 8. UI 与设计实现方案

### 8.1 设计基调

沿用 Stitch 原型方向：

- 工业 B2B
- 清晰材料展示
- 深炭黑、橄榄绿、暖白、浅灰
- 少阴影，多边框和清晰分区
- 不做军品商城风格
- 成品装备图片只作为应用参考

### 8.2 响应式策略

断点建议：

- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `>= 1024px`
- Wide: `>= 1280px`

移动端重点：

- 首屏能同时看到产品图、标题和 CTA
- 表单单列排列
- 参数表改成键值列表或横向滚动
- 底部固定 `Contact / Request Quote`
- 导航使用抽屉菜单

### 8.3 组件原则

- 页面模块拆成 section 组件
- 通用按钮、输入框、卡片、容器抽到 `components/ui`
- 表单组件独立，便于复用在 Home、Products、Contact 页面
- 不为简单展示页引入复杂状态管理

## 9. 图片与资源方案

### 9.1 图片类型

需要准备：

- 产品卷料图
- 材料纹理近景
- 迷彩图案样本
- 背胶和复合结构图
- 工厂车间图
- 生产设备图
- 仓库和发货图
- 应用场景参考图

### 9.2 图片存放

第一阶段推荐：

- 站点固定展示图片放在 `public/images`
- 文件命名使用英文小写和连字符

示例：

```text
public/images/products/camo-loop-fabric-roll-01.jpg
public/images/products/adhesive-backed-camo-loop-fabric.jpg
public/images/factory/production-workshop-01.jpg
public/images/applications/tactical-patch-application.jpg
```

### 9.3 图片优化

使用 Next.js `next/image` 处理页面图片，避免直接用原始大图铺满页面。

建议：

- 上传前压缩图片
- Hero 图控制在合理尺寸
- 图片提供清晰 `alt`
- 产品图尽量使用 WebP / AVIF
- 首屏关键图优先加载

### 9.4 询盘附件

如果 Contact 表单需要客户上传样品图或参考图，有两种方案：

方案 A：第一版不开放附件上传

- 表单里提示客户通过邮件发送样品图
- 开发简单，风险低

方案 B：接入 Vercel Blob

- 客户上传参考图
- 文件存入 Vercel Blob
- 邮件中附上文件链接

推荐第一版使用方案 A；如果你确定客户需要上传参考图，再做方案 B。

## 10. 询盘表单方案

### 10.1 表单类型

网站需要两种表单：

1. Quick Inquiry Form：用于首页和产品页底部
2. Full Inquiry Form：用于 Contact 和 Customization 页面

### 10.2 Quick Inquiry 字段

- Name
- Email
- Product Interest
- Quantity
- Message

### 10.3 Full Inquiry 字段

- Name
- Company
- Email
- Country
- WhatsApp
- Product Interest
- Required Pattern / Color
- Width / Thickness
- Quantity
- Backing Type
- Message
- Upload Reference Image（第二阶段可选）

### 10.4 表单处理流程

```text
用户提交表单
  -> 前端基础校验
  -> Server Action / API Route
  -> Zod 服务端校验
  -> 反垃圾检查
  -> 发送邮件给业务邮箱
  -> 返回成功状态
  -> 前端显示 Thank you
```

### 10.5 邮件内容

邮件标题建议：

```text
New Material Inquiry - Camo Hook and Loop Fabric
```

邮件正文包含：

- 客户姓名
- 公司
- 国家
- 邮箱
- WhatsApp
- 感兴趣产品
- 图案 / 颜色
- 宽幅 / 厚度
- 数量
- 背面工艺
- 留言
- 来源页面
- 提交时间

### 10.6 反垃圾策略

第一阶段建议：

- Honeypot 隐藏字段
- 最短提交时间检查
- 必填字段服务端校验
- 邮箱格式校验
- 同 IP 简单频率限制

后续如果垃圾询盘增多：

- 接入 Cloudflare Turnstile
- 使用 Vercel KV / Upstash 做频率限制

## 11. SEO 技术方案

### 11.1 页面级 metadata

每个核心页面都需要配置：

- title
- description
- canonical
- openGraph title
- openGraph description
- openGraph image

示例首页标题：

```text
Camouflage Felt Hook and Loop Fabric Manufacturer
```

示例首页描述：

```text
Factory supply of custom camouflage felt hook and loop fabric material for tactical gear, patches, uniforms, helmet covers, bags, and outdoor equipment.
```

### 11.2 关键词页面

重点关键词：

- camouflage hook and loop fabric
- camo loop fabric
- camouflage felt fabric
- military hook and loop fabric
- tactical gear loop fabric
- hook and loop fabric for patches
- custom camouflage loop fabric manufacturer

### 11.3 Sitemap 与 Robots

使用 Next.js App Router 的 metadata file conventions：

```text
src/app/sitemap.ts
src/app/robots.ts
```

Sitemap 包含：

- Home
- Products
- Product Detail
- Applications
- Customization
- Factory
- About
- Contact
- Blog posts（第二阶段）

### 11.4 结构化数据

建议添加：

- Organization
- WebSite
- Product
- BreadcrumbList
- FAQPage（FAQ 页面）

### 11.5 内容 SEO 策略

第一阶段上线基础页面。

第二阶段每月增加 2 到 4 篇文章，例如：

- What is camouflage hook and loop fabric?
- How to choose loop fabric for tactical patches
- Adhesive backed loop fabric vs sew-on loop fabric
- Custom camouflage patterns for tactical gear manufacturers

## 12. 性能方案

### 12.1 静态优先

大部分页面应使用静态渲染：

- Home
- Products
- Applications
- Customization
- Factory
- About
- Contact

由于内容不频繁变化，静态页面对性能和 SEO 都更友好。

### 12.2 图片优化

- 使用 `next/image`
- 控制首屏图片尺寸
- 非首屏图片懒加载
- 使用合适的 `sizes`
- 避免上传超大原图直接渲染

### 12.3 JS 控制

- 尽量使用 Server Components
- 只有表单、移动导航、图片轮播等需要交互的组件使用 Client Components
- 不引入重型动画库作为第一版依赖

### 12.4 性能目标

建议目标：

- Lighthouse Performance: 90+
- SEO: 95+
- Accessibility: 90+
- Best Practices: 90+
- 首屏核心内容快速可见

## 13. 安全方案

### 13.1 环境变量

敏感信息只放在环境变量中，不提交到 GitHub。

示例：

```text
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
BLOB_READ_WRITE_TOKEN=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

提交 `.env.example`，但不提交 `.env.local`。

### 13.2 表单安全

- 所有字段服务端校验
- 不信任前端输入
- 对邮件正文进行安全转义
- 限制 message 长度
- 限制上传文件类型和大小
- 不在页面中暴露 API key

### 13.3 GitHub 安全

- 不提交真实密钥
- 开启 GitHub secret scanning
- 使用分支保护规则
- main 分支通过 PR 合并

## 14. GitHub 工作流

### 14.1 分支策略

建议：

- `main`：正式生产分支
- `develop`：可选，开发集成分支
- `feature/*`：功能分支
- `fix/*`：修复分支

如果项目规模较小，也可以只使用：

- `main`
- `feature/*`

### 14.2 提交流程

```text
本地开发
  -> 创建 feature 分支
  -> 提交代码
  -> 推送 GitHub
  -> 创建 Pull Request
  -> Vercel 自动生成 Preview Deployment
  -> 检查预览链接
  -> 合并 main
  -> Vercel 自动部署 Production
```

### 14.3 Commit 规范

建议使用简洁英文：

```text
feat: add product detail page
feat: add inquiry form
fix: improve mobile navigation
chore: configure seo metadata
docs: add deployment guide
```

## 15. Vercel 部署方案

### 15.1 部署流程

1. 在 GitHub 创建仓库
2. 推送 Next.js 项目代码
3. 在 Vercel Import Git Repository
4. 选择 GitHub 仓库
5. 确认 Framework Preset 为 Next.js
6. 配置环境变量
7. 执行首次部署
8. 绑定正式域名
9. 配置 DNS
10. 开启 Production Deployment

### 15.2 环境分离

Vercel 建议配置：

- Development：本地开发
- Preview：PR 和非 main 分支
- Production：main 分支

环境变量也按环境区分：

- Preview 可使用测试邮箱
- Production 使用正式业务邮箱

### 15.3 构建命令

默认即可：

```bash
npm run build
```

输出目录不需要手动配置，Vercel 会识别 Next.js。

### 15.4 域名配置

建议：

- 主域名：`example.com`
- www：`www.example.com`
- 统一 301 到主域名或 www 版本

上线前确认：

- HTTPS 正常
- Sitemap 可访问
- Robots 可访问
- Contact 表单可提交
- 邮件可收到
- OG 图片显示正常

## 16. 推荐开发里程碑

### Milestone 1：项目初始化

目标：

- 创建 Next.js 项目
- 配置 TypeScript、Tailwind、ESLint
- 建立基础目录结构
- 添加 Header、Footer、Container、Button 等基础组件
- 配置站点基础 metadata

交付：

- 可运行的 Next.js 项目
- 基础布局完成

### Milestone 2：首页开发

目标：

- 实现 Hero
- 产品亮点
- 迷彩图案展示
- 应用场景入口
- 工厂实力摘要
- 快速询盘区

交付：

- 首页桌面端和移动端基本完成

### Milestone 3：产品与应用页面

目标：

- 产品中心
- 产品详情页
- 应用场景页
- 参数表和图案样本组件

交付：

- 产品展示路径完整
- 应用说明清楚

### Milestone 4：工厂、定制、关于我们

目标：

- Factory 页面
- Customization 页面
- About 页面
- 定制流程组件

交付：

- 工厂信任内容完整
- 定制能力表达清楚

### Milestone 5：询盘系统

目标：

- Quick Inquiry Form
- Full Inquiry Form
- 服务端校验
- 邮件发送
- 成功 / 错误状态
- 基础反垃圾

交付：

- 询盘可真实发送到邮箱

### Milestone 6：SEO 与部署

目标：

- sitemap
- robots
- metadata
- OG image
- Vercel 环境变量
- GitHub + Vercel 自动部署
- 域名绑定

交付：

- 正式站点上线

## 17. 第一版功能范围

### 必做

- 响应式首页
- 产品中心
- 产品详情页
- 应用场景页
- 定制能力页
- 工厂实力页
- 关于我们
- 联系页
- 询盘表单
- 邮件通知
- SEO metadata
- sitemap / robots
- Vercel 部署

### 暂不做

- 在线支付
- 购物车
- 用户登录
- 多语言后台
- 复杂 CMS
- 客户 CRM
- 在线客服系统
- 大规模文件上传

### 可选

- WhatsApp 浮动按钮
- 下载产品目录 PDF
- FAQ 页面
- Blog
- Vercel Blob 附件上传
- Cloudflare Turnstile

## 18. 风险与注意事项

### 18.1 图片素材风险

如果产品和工厂照片不足，网站可信度会明显下降。

建议优先拍摄：

- 卷料大图
- 材料细节
- 不同迷彩图案
- 工厂车间
- 设备
- 仓库
- 包装发货

### 18.2 成品展示误导

应用场景会出现战术背包、头盔套、贴章等图片，但必须明确：

```text
Finished products are shown for application reference only. We supply camouflage hook and loop fabric material.
```

该说明建议出现在：

- Home 应用模块
- Applications 页面顶部
- Footer

### 18.3 技术参数真实性

不要为了页面好看填写不确定的产能、MOQ、厚度、宽幅。

未确认内容使用：

- Customizable
- Contact us for details
- Depends on requirement
- Replace with real data

### 18.4 邮件送达

如果使用 Resend，需要配置发信域名和 DNS 记录。上线前必须测试：

- 表单提交
- 邮件到达
- 回复邮箱是否正确
- 垃圾邮件箱情况

## 19. 推荐开发命令

初始化：

```bash
npx create-next-app@latest camo-independent-website
```

本地开发：

```bash
npm run dev
```

代码检查：

```bash
npm run lint
```

生产构建：

```bash
npm run build
```

本地预览生产构建：

```bash
npm run start
```

## 20. 参考资料

- Next.js App Router metadata / sitemap 文件约定：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js metadata API：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js Server Actions 表单指南：https://nextjs.im/docs/app/guides/forms/
- Vercel 导入 Git 项目：https://vercel.com/docs/getting-started-with-vercel/import
- Vercel 部署方式：https://vercel.com/docs/deployments/deployment-methods
- Vercel 环境变量：https://vercel.com/docs/projects/environment-variables
- Vercel Blob：https://vercel.com/docs/vercel-blob
- Resend Next.js 集成：https://resend.com/nextjs
- Cloudflare Turnstile：https://developers.cloudflare.com/turnstile/

## 21. 推荐结论

建议采用：

```text
Next.js App Router + TypeScript + Tailwind CSS + GitHub + Vercel
```

第一版不引入 CMS 和数据库，使用结构化 TypeScript 内容文件管理产品、应用和图案数据；询盘通过表单提交后发送邮件。这样开发速度快、维护成本低、SEO 友好，也便于后续逐步升级为 CMS、CRM 或多语言站点。
