# Shubban Web Development Rules

## Loading UX Style Guide
- **Always use skeleton placeholders** (like Google/Facebook) for all dynamic or database-fetched content.
- Do NOT use generic text like "Loading..." or empty components during API calls.
- Use `@/components/ui/Skeleton` for loader elements.
- For list-views (such as cards), render an layout-matching set of skeleton items using `AdviserCardSkeleton` or `ActivityCardSkeleton` depending on context.
- For table-views in administration pages, render matching table row skeletons using `TableRowSkeleton` with the correct column count.
- In Next.js Server Components, configure page-level or group-level dynamic states using the `loading.tsx` file inside the routing directory.
