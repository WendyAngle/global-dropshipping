<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep localized website copy in a typed shared dictionary so all visitor-facing sections switch together.
- Store quote inquiries through a validated public server function; never expose inquiry reads to visitors.
- Keep the marketing website as a single-page experience with section navigation and a shared quote dialog to minimize conversion friction.
