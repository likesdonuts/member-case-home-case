# Member Case – Home Case Look Up

A static web page for the **In Re Aqueous Film-Forming Foams Products Liability Litigation** MDL (MDL No. 2873, Lead Case 2:18-mn-2873, D.S.C.).

## Live Site

**[https://likesdonuts.github.io/member-case-home-case/](https://likesdonuts.github.io/member-case-home-case/)**

## What It Does

The page displays a searchable, paginated table of member cases consolidated into the lead case. Each row shows:

| Column Group | Columns |
|---|---|
| **Lead Case** | Member Case (docket number, linked to Bloomberg Law) · Case Name |
| **Home Case** | Case ID (linked to Bloomberg Law) · Case Name · Court |

- **Search** — filters across all five columns in real time
- **Pagination** — 100 rows per page with numbered page controls
- **Links** — case IDs link to Bloomberg Law documents at `https://www.bloomberglaw.com/product/blaw/document/<doc_id>`

## Repository Structure

```
index.html            # The webpage (HTML/CSS/JS, no framework dependencies)
case_info_data.json   # Case data — 22,459 records
README.md             # This file
```

## Data Model

`case_info_data.json` is a JSON array. Each record follows this schema:

```json
{
  "consol_juris_case_id":   "2:18-cv-03311",
  "consol_juris_court":     "scd",
  "consol_juris_doc_id":    "X1Q6O217P582",
  "consol_juris_case_name": "Ackerman et al v. 3M Company et al",
  "home_juris_case_id":     "",
  "home_juris_court":       "",
  "home_juris_doc_id":      "",
  "home_juris_case_name":   ""
}
```

| Field | Description |
|---|---|
| `consol_juris_case_id` | Docket number in the consolidated (lead) jurisdiction |
| `consol_juris_court` | Court code for the consolidated jurisdiction |
| `consol_juris_doc_id` | Bloomberg Law document ID for the member case |
| `consol_juris_case_name` | Case name in the consolidated jurisdiction |
| `home_juris_case_id` | Docket number in the originating (home) jurisdiction |
| `home_juris_court` | Name of the originating court |
| `home_juris_doc_id` | Bloomberg Law document ID in the home jurisdiction |
| `home_juris_case_name` | Case name in the home jurisdiction |

Fields are empty strings when no home jurisdiction data is available.

## How the Page Works

`index.html` is a fully self-contained static page with no build step or framework. On load, the browser fetches `case_info_data.json` from the same directory via the `fetch()` API, then renders the first page of results. All search and pagination logic runs client-side in JavaScript.

Because `fetch()` is used, the page must be served over HTTP — it cannot be opened as a local `file://` URL due to browser CORS restrictions. Any static web server works, including GitHub Pages.

## Updating the Data

To update the case list, replace the contents of `case_info_data.json` with a new JSON array following the schema above, then commit and push to `main`. GitHub Pages will redeploy automatically within about 60 seconds.

## Deployment (GitHub Pages)

The site is deployed via GitHub Pages from the `main` branch root. To configure or verify:

1. Go to **Settings → Pages** in the repository
2. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
3. Save — the site will be live at `https://likesdonuts.github.io/member-case-home-case/`

Deployment status and logs are visible at:
**[github.com/likesdonuts/member-case-home-case/actions](https://github.com/likesdonuts/member-case-home-case/actions)**
