# AdPages Local SEO Audit Kit

Use this page to keep local campaign planning, landing-page QA, and lead follow-up in one place.

## Today

- Campaign or service focus: `Emergency plumbing Perth`
- Primary landing page: `https://example.com/emergency-plumber-perth/`
- Owner: `Casey`
- Status: `Draft / Review / Live / Needs Fix`

## Databases To Add

### Landing Page QA

Import `data/audit-checklist.csv`.

Suggested views:

- `Blocking Issues`: filter `Severity` is `Fail`.
- `Needs Review`: filter `Status` is not `Done`.
- `Ready For Publish`: filter `Status` is `Done` and `Severity` is not `Fail`.

### Campaign URLs

Import `data/campaign-tracker.csv`.

Suggested views:

- `Live Campaigns`: filter `Status` is `Live`.
- `Needs UTM Review`: filter `Final URL` is empty or `UTM Campaign` is empty.
- `By Channel`: group by `UTM Medium`.

### Lead Follow-Up

Import `data/lead-follow-up.csv`.

Suggested views:

- `New Leads`: filter `Status` is `New`.
- `Today`: filter `Next Follow-Up` is on or before today.
- `Won/Lost`: group by `Outcome`.

## Weekly Review

1. Check every live campaign URL still points at the intended page.
2. Review landing-page QA items marked `Fail` or `Warning`.
3. Confirm phone, form, booking, and conversion tracking signals are present.
4. Review new leads for source, campaign, page, and follow-up quality.
5. Move stale work to `Blocked` with a clear reason.

## Notes

- Keep this template free of real client data before publishing.
- Use plain campaign names that a future teammate can understand.
- Add proof, service area, and contact details before paid traffic goes live.
