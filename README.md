# Origin Dentals

Concept website for a fictional dental clinic in Kodambakkam, Chennai — built by [Chennai Digital Team](https://www.chennaidigitalteam.com).

Static HTML, CSS and JavaScript. No build step: deploy the folder as-is (for example on Vercel).

## Structure

```
index.html            home: hero video with quick booking, treatments, symptom finder, clinic story,
                      equipment, dentists, patient stories, fees, FAQ, booking, map
services/*.html       9 treatment pages
doctors/*.html        4 dentist profiles
assets/site.css       styles (light purple + white)
assets/site.js        menus, open-now badge, tabs, lazy video, quick booking, booking form
assets/img, media     photos, posters and video
```

## Booking

The form validates in the browser, shows a confirmation and offers to send the request on WhatsApp. It does not store bookings yet; it can be connected to Firebase and an admin dashboard in the same way as the Alpha Clinic project.

## Media

Photos from [Unsplash](https://unsplash.com/license) and video from [Mixkit](https://mixkit.co/license/#videoFree), both free for commercial use. The clinic, dentists and patient stories are fictional.

The phone number (+91 00000 00000), email (hello@example.com) and WhatsApp link are placeholders, and the map shows Chennai without a pin or street address.
