### Checkpoint 2
Show the **“Join Me on my CS Journey”** landing hero page **only the first time a user enters the website**. On subsequent visits (navigating back to the map, or reloading within the same session), bypass the landing hero and go straight to the map.

Set the **background color of the Map page to white** to match the map.

On the Map page, the **plane icon should always rotate to point toward the user’s cursor position**.

When a user clicks “Back” from any content page, return to the Map with the plane positioned at the **last stop visited** (not reset to Stop #1).

Draw a **subtle dotted line** connecting visited pins to indicate the journey path and progress.

Each pin’s popup card should include a **photo gallery**. The gallery should use the **same set of images** already used on that page’s gallery. Users should be able to click forward/backward within the gallery.

On hover, show a **teaser tooltip** with richer info (e.g., “Bay Area, California – Home”) instead of just the pin’s name.

Update the **Journey Progress tracker** in the navigation menu to show all pages the user has visited so far. This should update even if the user visits pages out of sequence (not strictly in journey order).

On each content page, when the user clicks **“Continue Journey to ___”**, redirect them back to the map. Animate the plane flying to the **next stop** and then automatically open that stop’s card.



### Checkpoint 3
Smooth the plane’s movement animation on the map.

Increase the animation speed so the plane flies faster between pins.

Fix the issue where cards are cut off at the bottom.

Reduce the card size (height and width) so all content (image gallery + “Enter” / “Continue Journey” buttons) fits fully on screen.

Each pin’s card should display **all images** from that page’s gallery.

When the user clicks “Continue Journey to ___” **from a page, r**eturn to the map. Place the plane at the **pin corresponding to the page just visited**. Animate the plane flying to the **next stop in sequence**.

Journey order: 1 = Start, 2 = Home, 3 = Education, 4 = Experience, 5 = Projects & Research, 6 = Leadership & Involvement.

The last stop in the journey can have a “Return to Start” button instead of a “Continue Journey” button that moves the plane back to the first pin. 

Draw a **light dashed line** connecting one pin to the next **only when the user continues the journey from a page** (not from inside the card). This ensures the path shows visited + continued stops in journey order.

Ensure **all pages** redirect back to the map when the “Continue Journey to ___” button is clicked (not just some).

Fix the progress tracker so that whenever a user visits a page, that stop is marked as “read/visited.” The progress should update the next time the map + hamburger menu are viewed.


### Checkpoint 4 - Fixes to Make

## Plane Behavior
- The plane should remain stationary when idle.  
- Remove the current "bouncing" animation.  
- When the user clicks **“Continue Journey from ___”** on a page:  
  - Place the plane at the **pin corresponding to the page just visited**.  
  - Animate the plane flying to the **next stop in sequence**.  
- Ensure this sequence works consistently for all pages in the journey.

## Location Card Positioning
- Fix the issue where location cards are **cut off at the bottom of the screen** when a pin is near the lower part of the map.  
- The entire card content (image gallery + action buttons) must always be fully visible.  
- Solution options may include:
  - Dynamically repositioning the card above the pin if there isn’t enough space below.  
  - Allowing flexible sizing or scroll within the card container.  
  - Adjusting container overflow rules so cards are not clipped.  


Only change the necessary files to fix these issues.