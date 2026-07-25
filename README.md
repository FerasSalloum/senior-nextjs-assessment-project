# 🧪 مشروع تقييم مطور Next.js بمستوى متقدم (Senior)

## مبادئ SOLID + Next.js + PostgreSQL + Prisma ORM

> **المستوى:** متقدم
> **الوقت المقدر:** 3 - 5 أيام
> الغرض من هذا التقييم هو قياس قدرتك على تصميم برمجيات قابلة للتوسعة باستخدام **مبادئ SOLID**، و**Next.js** الحديث، و**PostgreSQL**، و**Prisma ORM**، مع كتابة كود نظيف، قابل للصيانة، وجاهز للإنتاج (Production-ready).

---

# التقنيات المستخدمة (Tech Stack)

التقنيات المطلوبة:

- Next.js 15+ (App Router)
- TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- React Hook Form
- Zod
- Server Actions
- API Route Handlers
- ESLint
- Prettier

تقنيات اختيارية (إضافية - Bonus):

- shadcn/ui
- TanStack Table
- React Query
- Docker
- Redis

---

# المشروع

## نظام إدارة المهام (Task Management System)

قم بناء تطبيق مصغر لإدارة المشاريع حيث يمكن للمستخدمين إدارة المشاريع والمهام الخاصة بهم.

---

# المتطلبات الوظيفية (Functional Requirements)

## المصادقة (Authentication)

قم بتنفيذ نظام مصادقة بسيط.

حقول المستخدم (User):

- id (المعرف)
- name (الاسم)
- email (البريد الإلكتروني)
- password (كلمة المرور)

المتطلبات:

- التسجيل (Register)
- تسجيل الدخول (Login)
- تسجيل الخروج (Logout)
- تشفير كلمات المرور (Password hashing)
- المسارات المحمية (Protected routes)

---

## المشاريع (Projects)

يمكن لكل مستخدم إنتاج ومشاهدة مشاريعه الخاصة.

حقول المشروع (Project):

- id
- title (العنوان)
- description (الوصف)
- ownerId (معرف المالك)
- createdAt (تاريخ الإنشاء)

المميزات:

- إنشاء مشروع
- تحديث مشروع
- حذف مشروع
- عرض مشاريعي

---

## المهام (Tasks)

كل مشروع يحتوي على العديد من المهام.

حقول المهمة (Task):

- id
- title (العنوان)
- description (الوصف)
- status (الحالة)
- priority (الأولوية)
- dueDate (تاريخ الاستحقاق)
- projectId (معرف المشروع)
- assigneeId (معرف المستخدم المعين له المهمة)

حالات المهمة (Status):

- Todo (قيد الانتظار)
- In Progress (قيد التنفيذ)
- Done (منجز)

الأولويات (Priority):

- Low (منخفضة)
- Medium (متوسطة)
- High (عالية)

المميزات:

- إنشاء مهمة
- تعديل مهمة
- حذف مهمة
- تغيير الحالة
- تعيين مستخدم للمهمة
- تصفية المهام (Filter)
- البحث عن المهام
- ترتيب المهام (Sort)

---

## لوحة التحكم (Dashboard)

عرض البيانات التالية:

- إجمالي المشاريع
- إجمالي المهام
- المهام المكتملة
- المهام المعلقة
- المهام المتأخرة

---

# قاعدة البيانات (Database)

استخدم PostgreSQL مع Prisma ORM.

العلاقات المتوقعة:

```
User
├── Projects
└── Assigned Tasks

Project
├── Owner
└── Tasks

Task
├── Project
└── Assigned User

```

---

# واجهات برمجة التطبيقات (API)

قم بإنشاء نقاط نهاية REST نظيفة أو Route Handlers.

مثال:

```
GET /api/projects
POST /api/projects
GET /api/tasks
POST /api/tasks
PATCH /api/tasks/:id
DELETE /api/tasks/:id

```

---

# التحقق من البيانات (Validation)

استخدم مكتبة Zod.

تحقق من صحة البيانات لكل من:

- البريد الإلكتروني
- كلمة المرور
- المشروع
- المهمة

لا تثق أبداً بالتحقق من جانب العميل (Client-side validation).

---

# متطلبات واجهة المستخدم (UI Requirements)

الصفحات:

- تسجيل الدخول (Login)
- التسجيل (Register)
- لوحة التحكم (Dashboard)
- المشاريع (Projects)
- تفاصيل المشروع (Project Details)
- تفاصيل المهمة (Task Details)
- الملف الشخصي (Profile)

التصميم المتجاوب (Responsive design) مطلوب إلزاميًا.

---

# معالجة الأخطاء (Error Handling)

التعامل مع:

- المعرفات غير الصالحة (Invalid IDs)
- الوصول غير المصرح به (Unauthorized Access)
- أخطاء التحقق من البيانات (Validation Errors)
- أخطاء قاعدة البيانات (Database Errors)
- أخطاء الشبكة (Network Errors)

يجب ألا يحدث انهيار أبداً في التطبيق (No application crash should occur).

---

# متطلبات البنية الهندسية (Architecture Requirements)

يجب أن تكون هيكلة المجلدات نظيفة وقابلة للتوسعة.

مثال:

```
src
app
components
features
lib
repositories
services
validators
hooks
types
utils

```

---

# متطلبات مبادئ SOLID

يجب أن **يوضح تطبيقك بوضوح مبادئ SOLID الخمسة**.

---

## 1. مبدأ المسؤولية الفردية (Single Responsibility Principle - SRP)

يجب أن تمتلك كل فئة (Class) أو وحدة برمجية (Module) مسؤولية واحدة فقط.

أمثلة:

- AuthService
- ProjectService
- TaskService
- EmailService

تجنب تصميم مثل هذا:

```
TaskService
- creates task
- validates task
- sends email
- logs activity
- uploads files

```

---

## 2. مبدأ الفتح والإغلاق (Open / Closed Principle - OCP)

يجب أن يكون النظام قابلاً للتوسعة دون الحاجة لتعديل الكود الحالي.

مثال:
بدلاً من استخدام:

```
if(status==="todo")

```

قم بإنشاء:

```
TaskStatusStrategy

```

أو

```
NotificationProvider

```

مما يسمح بإضافة تطبيقات جديدة بسهولة.

---

## 3. مبدأ استبدال ليسكوف (Liskov Substitution Principle - LSP)

يجب أن تكون الفئات المشتقة قادرة على استبدال الفئات الأساسية دون الإخلال بسلوك النظام.

مثال:

```
NotificationService
EmailNotification
SlackNotification
SMSNotification

```

يجب أن يعمل أي مزود إشعارات دون الحاجة لتغيير كود العميل (Client code).

---

## 4. مبدأ فصل الواجهات (Interface Segregation Principle - ISP)

تجنب إنشاء واجهات (Interfaces) ضخمة.

سيء:

```
IRepository

```

تحتوي على 20 دالة.

جيد:

```
ReadableRepository
WritableRepository
SearchableRepository

```

---

## 5. مبدأ عكس تبعية الاعتماديات (Dependency Inversion Principle - DIP)

يجب أن تعتمد الوحدات عالية المستوى على تجريدات (Abstractions).

جيد:

```
TaskService
↓
ITaskRepository
↓
PrismaTaskRepository

```

يجب عدم الاعتماد مطلقاً على Prisma مباشرة داخل منطق الأعمال (Business logic).

---

# نمط المستودع (Repository Pattern)

قم بتنفيذ المستودعات (Repositories).

مثال:

```
IProjectRepository
ProjectRepository
ITaskRepository
TaskRepository
IUserRepository
UserRepository

```

يجب ألا يتمكن منطق الأعمال من الوصول إلى Prisma مباشرة بأي حال من الأحوال.

---

# طبقة الخدمات (Service Layer)

قم بتنفيذ فئات الخدمات (Service classes).

مثال:

```
AuthService
ProjectService
TaskService

```

قواعد الأعمال تنتمي إلى هذه الطبقة.

---

# الميزات الإضافية (Bonus Features)

- إشعارات البريد الإلكتروني
- سجلات النشاط (Activity logs)
- التقسيم إلى صفحات (Pagination)
- التمرير اللانهائي (Infinite scrolling)
- الوضع الداكن (Dark mode)
- التحديثات المتفائلة (Optimistic updates)
- الصلاحيات المستندة إلى الأدوار (Role-based authorization)
- اختبارات الوحدة (Unit tests)
- اختبارات التكامل (Integration tests)
- دوكر (Docker)
- التكامل/النشر المستمر (CI/CD)
- توثيق Swagger

---

# جودة الكود (Code Quality)

يجب أن يتضمن المشروع:

- تفعيل وضع TypeScript الصارم (Strict mode)
- ESLint
- Prettier
- مكونات قابلة لإعادة الاستخدام (Reusable components)
- خطافات مخصصة قابلة لإعادة الاستخدام (Reusable hooks)
- عدم وجود كود مكرر (No duplicated code)
- تسميات ذات معنى (Meaningful naming)
- هندسة نظيفة (Clean architecture)
- متغيرات البيئة (Environment variables)
- رسائل Git commits واضحة ومنظمة

---

# التسليمات المطلوبة (Deliverables)

قم بتسليم ما يلي:

- مستودع GitHub
- ملف README.md
- مخطط قاعدة البيانات (Database schema)
- تهجيرات Prisma (Prisma migrations)
- سكريبت البيانات الأولية (Seed script)
- ملف نموذج البيئة (.env.example)
- لقطات الشاشة (Screenshots)
- رابط النسخة الحية - اختياري (Live Demo)

---

# معايير التقييم (Evaluation Criteria)

| الفئة                             | الدرجة |
| --------------------------------- | ------ |
| هيكل المشروع (Project Structure)  | 10     |
| مبادئ SOLID                       | 30     |
| تصميم قاعدة البيانات و Prisma     | 10     |
| أفضل ممارسات Next.js              | 15     |
| TypeScript                        | 10     |
| الكود النظيف (Clean Code)         | 10     |
| واجهة وتجربة المستخدم (UI/UX)     | 5      |
| معالجة الأخطاء                    | 5      |
| التحقق من البيانات (Validation)   | 5      |
| الميزات الإضافية (Bonus Features) | 10     |

**المجموع الكلي: 100 نقطة**

---

# ملاحظات هامة (Important Notes)

- الهندسة النظيفة (Clean Architecture) أهم بكثير من إضافة العديد من الميزات.
- يجب أن تكون مبادئ SOLID واضحة وجلية في قرارات التصميم الخاصة بك.
- تجنب وضع منطق الأعمال داخل مكونات React.
- تجنب الاستخدام المباشر لـ Prisma داخل واجهات المستخدم أو Route Handlers.
- حافظ على أن تكون المكونات صغيرة وقابلة لإعادة الاستخدام.
- اكتب كوداً قابلاً للصيانة وجاهزاً للإنتاج (Production-ready).
- افترض أن هذا المشروع سيتم صيانته بواسطة فريق من المطورين لعدة سنوات قادمة.

---

# النتيجة المتوقعة (Expected Outcome)

من خلال إكمال هذا التقييم، يجب أن يثبت الطالب قدرته على:

- بناء تطبيقات Next.js قابلة للتوسعة.
- تصميم هندسة برمجيات قابلة للصيانة.
- تطبيق جميع مبادئ SOLID بشكل صحيح.
- العمل مع PostgreSQL باستخدام Prisma ORM.
- فصل الاهتمامات بفعالية (Separation of concerns).
- كتابة كود TypeScript بجودة إنتاجية.
- اتباع أفضل ممارسات تطوير الويب المتكامل الحديثة (Modern full-stack development best practices).
