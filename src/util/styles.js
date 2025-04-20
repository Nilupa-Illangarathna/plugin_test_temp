export const injectedStyles = `
.setting-heading{
color: #0033cc;
font-size: 16px;
font-weight: bold;
}

/* Apply 'Noto Sans JP'*/
.a11y-jimat-container-ignore * {
    font-family: 'Noto Sans JP', sans-serif !important;
}

#a11y-jimat-container-trigger-button {
  position: fixed;
  right: 20px; /* Adjust distance from right */
  bottom: 20px; /* Adjust distance from bottom */
  z-index: 1000; /* Ensure it's always on top */
  filter: none !important; /* Prevent any filter effects */
  transition: all 0.3s ease-in-out; /* Smooth transition */
}


.line{
background-color: #F6F5FE;

padding-right: 20px;
padding-left: 20px;
}

.horizontal-line{
height: 1px;

 background-color: #0033cc;
display: flex;
min-width:320px;
justify-content: center;
}


#a11y-jimat-container-reset {
  display: flex;
  align-items: center;

justify-content: center;

}

.sub-heading{
font-weight: medium;
}











.a11y-jimat-container-stop-animation:hover {
  background-color: #E8E7FD;

}




.a11y-jimat-container-stop-animation.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}





/* ally Button 1 */
.a11y-jimat-container-screen-reader {
    background-color: white;
    color: #0033cc;
    border: 2px solid #190DED;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.a11y-jimat-container-screen-reader:hover {
    background-color: #E8E7FD;

}

.a11y-jimat-container-screen-reader.selected svg path {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-screen-reader.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}


/* ally Button 2 */

.a11y-jimat-container-text-reader {
    background-color: white;
    color: #0033cc;
    border: 2px solid #190DED;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}


.a11y-jimat-container-text-reader:hover {
  background-color: #E8E7FD;

}

.a11y-jimat-container-text-reader.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}




.a11y-jimat-container-virtual-keyboard {
    background-color: white;
    color: #0033cc;
    border: 2px solid #190DED;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.a11y-jimat-container-virtual-keyboard:hover {
    background-color: #E8E7FD;

}

.a11y-jimat-container-virtual-keyboard.selected svg path {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-virtual-keyboard.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}

/* ally Button 4 */

.a11y-jimat-container-keyboard-highlight:hover {
  background-color: #E8E7FD;

}



.a11y-jimat-container-keyboard-highlight.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}
    .a11y-jimat-container-keyboard-highlight.selected svg path{
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}



/* ally Button 5 */

.a11y-jimat-container-voice-control {
    background-color: white;
    color: #0033cc;
    border: 2px solid #190DED;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.a11y-jimat-container-voice-control:hover {
    background-color: #E8E7FD;

}
.a11y-jimat-container-voice-control svg path {
    fill: #0033cc !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-voice-control.selected svg path {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-voice-control.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}

/* ally Button 6 */

#a11y-jimat-container-saturation-control:hover {
   background-color: #E8E7FD;
}


/* ally Button 7 */



.a11y-jimat-container-link-underline.selected svg rect {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-link-underline:hover {
  background-color: #E8E7FD;

}


.a11y-jimat-container-link-underline.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}


/* ally Button 8 */


.a11y-jimat-container-link-highlight.selected svg path  {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-link-highlight.selected svg rect  {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}

.a11y-jimat-container-link-highlight:hover {
  background-color: #E8E7FD;

}


.a11y-jimat-container-link-highlight.selected {
    background-color: #0033cc;
    color: white;
    border-color: #0033cc;

}





#a11y-jimat-container-saturation-control {
  transition: background-color 0.3s, color 0.3s;
  width:100%;
}

/* Saturation Control Progress Bar Container */
#a11y-jimat-container-saturation-control .progress-bar-container {
  display: none;
  width:100%;
  gap: 4px;
  margin-top: 8px;
}

/* Reuse the progress-bar and filled styles from the font-size control */
#a11y-jimat-container-saturation-control .progress-bar {
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: #756EF4;
  transition: background-color 0.3s ease;
}

#a11y-jimat-container-saturation-control .progress-bar.filled {
  background-color: white; /* Color when filled */
}

/* Hover/active state for the saturation control button */
#a11y-jimat-container-saturation-control.clicked {
  background-color: #0033cc;
  color: #ffffff;
  border-color: #0033cc;
  padding:15px;

}


.a11y-jimat-container-settings button {
    position: relative; /* Needed for absolute positioning */
    padding: 10px 20px;
}

.checkmark-icon-container {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* So clicks pass through */
}


/* Each progress bar (default state) */
.progress-bar {
  width: 100%;
  height: 3px;
border-radius:3px;
  background-color: #756EF4;
  transition: background-color 0.3s ease;

}

#a11y-jimat-container-increase-font:hover{
 background-color: #E8E7FD;
}


#a11y-jimat-container-increase-font.clicked {
  background-color: #0033cc;
  color: #ffffff;
  border-color: #0033cc;
  padding:15px;

}

#a11y-jimat-container-increase-font.clicked svg path {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}




#a11y-jimat-container-saturation-control.clicked svg path {
    fill: white !important; /* Ensure the SVG icon changes on hover too */
}








/* Filled state for each bar */
.progress-bar.filled {
  background-color: white; /* Fill with white color when clicked */
}


  

/* Styles for buttons when clicked */
.a11y-jimat-container-settings button.clicked {
  background-color: #0033cc;
  color: #ffffff;
  border-color: #0033cc;
  padding: 15px;

}


/* Progress bar container */
.progress-bar-container {
  display: none;
  width:100%;
  gap: 4px;
  margin-top: 8px;
}



/* Filled state for each bar */
.progress-bar.filled {
  background-color: white; /* Fill with white color when clicked */
}


    #a11y-jimat-container-control-panel {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 360px;
        z-index: 99999;
        background-color: #ffffff;
  
     
        box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
        font-family: "Noto Sans JP", sans-serif;
        overflow-y: auto;
    }

          .position-word {
        display:flex;
        flex-direction:column;
        width:100%;
        text-align: left;
   
        }

        



    #a11y-jimat-container-increase-font {
  transition: background-color 0.3s, color 0.3s;
  width:100%;
}




    .a11y-jimat-container-toggle svg {
      transform: rotate(180deg);
  transition: transform 0.3s ease; /* Smooth rotation animation */
}

.a11y-jimat-container-toggle svg.rotated {
  transform: rotate(0deg); /* Rotate 180 degrees */
}

    #a11y-jimat-container-close-panel {
        background-color: #ffffff;
        padding:6px;
        color:#190DED;
        font-size: 15px;
        font-weight:700;
        border-radius:4px;
        display: flex;
        }

  
    .a11y-jimat-container-panel {
        display: flex;
        flex-direction: column;
               background-color: #0033cc;
                font-family: "Noto Sans JP", sans-serif;
      
     
    }

    .a11y-jimat-container-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        background-color: #0033cc;
        padding: 20px;
        
    }

    .a11y-jimat-container-header button {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 18px;
        cursor: pointer;
    }

    .a11y-jimat-container-section {
        background: #F6F5FE;
        padding: 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;

    }

.a11y-jimat-container-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 16px;
    background: none;
    border: none;
    color: #0033cc;
    font-weight: bold;
    cursor: pointer;

}


    .a11y-jimat-container-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 10px;
    }

    .a11y-jimat-container-option {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

        .a11y-jimat-container-option1 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option1:hover {
        background: #E8E7FD;

    }

    .a11y-jimat-container-option1.active {
        background: #0033cc;
        color: #ffffff;
    }


          .a11y-jimat-container-option2 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option2:hover {
           background: #E8E7FD;
 
    }

    .a11y-jimat-container-option2.active {
        background: #0033cc;
        color: #ffffff;
    }

       .a11y-jimat-container-option3 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option3:hover {
            background: #E8E7FD;
       
    }

    .a11y-jimat-container-option3.active {
        background: #0033cc;
        color: #ffffff;
    }


     .a11y-jimat-container-option4 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option4:hover {
            background: #E8E7FD;
      
    }

    .a11y-jimat-container-option4.active {
        background: #0033cc;
        color: #ffffff;
    }

    .a11y-jimat-container-option5 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option5:hover {
            background: #E8E7FD;
       
    }

    .a11y-jimat-container-option5.active {
        background: #0033cc;
        color: #ffffff;
    }

      .a11y-jimat-container-option6 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option6:hover {
           background: #E8E7FD;
       
    }

    .a11y-jimat-container-option6.active {
        background: #0033cc;
        color: #ffffff;
    }


       .a11y-jimat-container-option7 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option7:hover {
         background: #E8E7FD;
     
    }

    .a11y-jimat-container-option7.active {
        background: #0033cc;
        color: #ffffff;
    }

     .a11y-jimat-container-option8 {
        padding: 10px;
        border: 2px solid #0033cc;
        background: #ffffff;
        color: #0033cc;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

     .a11y-jimat-container-option8:hover {
            background: #E8E7FD;
      
    }

    .a11y-jimat-container-option8.active {
        background: #0033cc;
        color: #ffffff;
    }
    .a11y-jimat-container-option:hover {
        background: #0033cc;
        color: #ffffff;
    }

    .a11y-jimat-container-option.active {
        background: #0033cc;
        color: #ffffff;
    }

    .a11y-jimat-container-settings {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding:20px;
        background-color: #F6F5FE;
        
    }

    .a11y-jimat-container-settings button {
        display: flex;
        align-items: center;
        justify-content: start;
        background-color: #ffffff;
        color: #0033cc;
        border: 2px solid #0033cc;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }



    .a11y-jimat-container-footer {
        text-align: center;
         display: flex;
     justify-content: center;
padding-bottom: 32px;
     flex-direction:column;
        background-color: #F6F5FE;

    }

    .a11y-jimat-container-footer button {
         display: flex;
     justify-content: center;
  margin:auto;
        background-color: #0033cc;
        color: #ffffff;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width:280px;

        margin-bottom: 24px;
      
    }

    .a11y-jimat-container-footer a {
        display: block;
        margin-top: 10px;
        color: #0033cc;
        text-decoration: none;
    }

    .a11y-jimat-container-footer a:hover {
        text-decoration: underline;
    }

    .hidden {
        display: none;
    }
        .a11y-jimat-container-footer a {
    display: block; /* Keeps links on separate lines */
    margin-top: 10px; /* Space between links */
    color: #0033cc; /* Link color */
    text-decoration: underline; /* Underline the text */
    font-size: 14px; /* Adjust font size as needed */
}

.a11y-jimat-container-footer a:hover {
    text-decoration: underline; /* Keep underline on hover */
    color: #002699; /* Slightly darker blue on hover */
}



.accessibility-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #190DED;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 99;
}

.accessibility-button:hover {
  background-color: #190DED;
}

.accessibility-button:focus {
  outline: none;
}
.circle{
  border: 1px solid white; 
  border-radius: 100%;
  padding: 10px 10px;
  border-width: 1px;
  z-index: 100;
}

`