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

## 19-4-2024

After the feedback session with Vasilis, I decided to remove the color picker. Vasilis reminded me of the Exclusive Design principle "Prioritise identity". The user wouldn't use the color picker, because the text and file inputs are easier to use.
