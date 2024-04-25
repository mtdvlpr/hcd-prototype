# hcd-prototype

This is a prototype for the HCD project.

## 3-4-2024

In the interview I came to the conclusion that the most important features would be to detect colors of a piece of clothing and to detect matching pieces of clothing. Another point to consider is that the user wants to be able to do things herself.

I created a prototype that can detect colors of a piece of clothing and that can detect matching pieces of clothing. The user can take a picture of a piece of clothing and the app will detect the colors of the piece of clothing. The user can then select a color by file input, color picker or text and the app will show matching pieces of clothing.

I tested the HTML color picker myself using a screen reader, but I couldn't get it to work. I decided however to keep it in the prototype, keeping in mind the Exclusive Design principle "Add nonsense", because maybe the user can use it.

<img src="https://github.com/mtdvlpr/hcd-prototype/assets/46671786/efc0975a-cd11-431b-8a34-cb3245521557" alt="Prototype colors v1" width="45%">
<img src="https://github.com/mtdvlpr/hcd-prototype/assets/46671786/aa66bdee-4dd5-4419-8b45-b2ac6809e387" alt="Prototype color palette v1" width="45%">

## 5-4-2024

I had a feedback session with Vasilis. He was excited about the prototype I had already made.

## 11-4-2024

During the user test I found out that the user was able to use the app and get the desired results. The file input was a bit difficult to use, because of the default text "Choose a file". The user expected a description of "Take an image". The user also wanted to take a picture of herself instead of the environment, which I set as the default. The form did not reset after submitting, which was confusing for the user, because the new value was not used.

I updated the prototype with the feedback from the user test. I created buttons with clear texts to control the file inputs. The user can now take a picture of herself, the environment or use an existing image. The form now resets after submitting.

![Screenshot 2024-04-19 093800](https://github.com/mtdvlpr/hcd-prototype/assets/46671786/8222dd26-0685-4e1b-9e62-434f30e96ce6)

## 12-4-2024

I showed the updated prototype to Eric. He was happy with the changes I made, but he urged me to think about adding nonsense. I will think about this in the next sprint.

## 16-4-2024

I made some more changes to the prototype. The input fields are now skipped while tabbing, so you have to use the buttons and don't get duplicate controls along the page. I improved the feedback when submitting the form and I moved the navigation to the bottom of the page.

![Screenshot 2024-04-19 093505](https://github.com/mtdvlpr/hcd-prototype/assets/46671786/600e1d7f-2262-4663-9f3b-b3ff06d194fd)

## 17-4-2024

The user test went well. The newly added buttons made the experience of making an image easier. The user found the color picker the least useful, so I will move it to the bottom of the form. The user found the image from gallery the best option, so I will move it to the top of the form. The color names were not always clear (e.g. "Turbo"). I'll try to get some more descriptions for the colors.

<img src="https://github.com/mtdvlpr/hcd-prototype/assets/46671786/3a05ba77-37f2-440e-b354-237c42d07aeb" alt="Prototype color palette before" width="45%">
<img src="https://github.com/mtdvlpr/hcd-prototype/assets/46671786/c1fe9677-ec36-4468-9b63-9d72b103e36c" alt="Prototype color palette after" width="45%">

## 19-4-2024

After the feedback session with Vasilis, I decided to remove the color picker. Vasilis reminded me of the Exclusive Design principle "Prioritise identity". The user wouldn't use the color picker, because the text and file inputs are easier to use. He also showed me a script that could help me describe colors better. I will try to implement this.

## 23-4-2024

I added the script that Vasilis showed me to the prototype. The colors are now described better.

![Screenshot 2024-04-24 090911](https://github.com/mtdvlpr/hcd-prototype/assets/46671786/e23f7bf5-f956-4f74-9575-0efd6b205991)

## 24-4-2024

I had the final user test. The user understood the purpose of the extra description and liked the premise, but the word "verzadigd" (saturated) was not clear. Furthermore, the user would prefer easier language overall that fits better with the screen reader that reads the words aloud.

I changed the word "verzadigd" to "fel" (bright) and I changed the word "onverzadigd" (unsaturated) to "flets" (pale) as per the user's preference.

## Reflection

Before the course started, I had an entirely different expectation of what I would be doing. I thought I would be applying the "regular" inclusive design principles, so I was surprised when we had to apply the exact opposite of those principles. We had to study the situation, ignore conventions (when applicable), prioritise identity and add nonsense. I am happy with the result of the prototype. I think I have succeeded in applying the principles and I have learned a lot from it. I will definitely use this knowledge in future projects.

### Study situation

I studied the situation by having an interview with the user as a group. I concluded that the most important features would be to detect colors of a piece of clothing and to detect matching pieces of clothing. I also concluded that the user wants to be able to do things herself.

### Ignore conventions

I ignored the convention to have the navigation at the top of the page. I moved the navigation to the bottom of the page, because the user would be able to use the application more easily and didn't really need the navigation.

### Prioritise identity

I prioritized identity by testing the prototype with the user and implementing the feedback she gave.

### Add nonsense

An example of nonsense that I added was adding a color picker, since the user is blind and relies on a screen reader. While testing myself with a screen reader, I couldn't get the color picker to work, but I decided to keep it in the prototype so the user could actually test it herself. It turned out that the user didn't use the color picker, so I removed it, but because I tested it, I could be sure that the user wouldn't use it and didn't make the assumption that the user wouldn't use it.

### Future improvements

I have a few ideas on how this prototype could be improved:

- The user wanted the wording to better fit with the screen reader that reads the words aloud. This could implemented by using language that is more common when speaking.
- While watching the user tests of others, I noticed that the user wanted to know when she reached the end of the page, to prevent going to the browser controls. This could be implemented by adding a footer with a "back to top" link.
