# Origin Dental

Concept website for a fictional multispeciality dental clinic in Kodambakkam, Chennai — built by [Chennai Digital Team](https://www.chennaidigitalteam.com). Layout and navigation follow the Acharya Dental reference site.

Static HTML, CSS and JavaScript. Deploy the folder as-is (for example on Vercel); `tools/` is excluded from the deployment.

## Editing

All pages are generated from one content file:

```
tools/content.mjs     clinic details, services menu, 22 treatments, 6 dentists, Google-reviews placeholders
tools/icons.mjs       line icons for the "Other treatments" carousel
tools/build.mjs       page templates
```

After editing, rebuild with `node tools/build.mjs` (Node 18 or later, no packages needed) and commit the regenerated HTML.

## Structure

```
index.html                    home: clinic tour video, managing directors, quick booking, treatments,
                              symptom finder, about, equipment, other treatments (fixed-photo carousel),
                              dentists, patient stories, fees, FAQ, booking, Google reviews, map
services/index.html           all treatments, grouped as in the Services menu
services/*.html               22 treatment pages
doctors/*.html                6 dentist profiles
international-patients.html   planning treatment from abroad
assets/site.css               styles (logo blue + slate, Poppins)
assets/site.js                menus, open-now badge, tabs, videos, carousels, booking form
assets/img, media             photos, logo, posters and video
```

## Before launch

- **Google reviews**: the reviews band uses placeholder reviews (`reviews` in `tools/content.mjs`). Replace them with the clinic's own Google reviews (Places API or a reviews widget) before the site represents a real clinic.
- **Booking**: the form validates in the browser, shows a confirmation and offers to send the request on WhatsApp. It does not store bookings yet; it can be connected to Firebase and an admin dashboard in the same way as the Alpha Clinic project.

## Media

Photos from [Unsplash](https://unsplash.com/license) and [Pexels](https://www.pexels.com/license/), and the equipment clip from [Mixkit](https://mixkit.co/license/#videoFree), all free for commercial use. The clinic tour video and the managing directors' portraits were supplied by the client. The clinic, dentists, patient stories and reviews are fictional.
