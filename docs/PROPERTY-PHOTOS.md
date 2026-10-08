# Temporary property photography

The dashboard uses three locally stored building photographs as temporary examples because the current `Property` model has no photo field. Cards visibly say “Foto contoh” to avoid suggesting that a stock photo depicts the user's property. The image shown is chosen deterministically from the property ID; the application does not associate an actual property with any of these buildings.

All three were downloaded from Unsplash and are [free to use under the Unsplash License](https://unsplash.com/license):

- `residence-1.jpg`: [modern house exterior by Alef Morais](https://unsplash.com/photos/modern-house-with-wooden-facade-and-stone-accents-emnfe1YR6io).
- `residence-2.jpg`: [apartment building exterior by Achyut](https://unsplash.com/photos/modern-apartment-building-exterior-with-numerous-windows-and-balconies-lC2Atn-fmow).
- `residence-3.jpg`: [modern two-story house by Troy Mortier](https://unsplash.com/photos/modern-two-story-house-with-a-dark-garage-door-HckCpdBDeDk).

Replace this ID-based example mapping when property photo upload or a verified per-property image field exists. The source photos are cropped to 720 × 540 px to keep cards fast on mobile.
