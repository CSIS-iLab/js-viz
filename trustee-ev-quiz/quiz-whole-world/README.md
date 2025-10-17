The code for the EV quiz being used in [EV Playbook Digital Report](https://features.csis.org/electric-vehicle-playbook). The code here is for posterity and isn't being used in production. The quiz is running fully in shorthand.

For the quiz to work properly, the following needs to be added to the Custom \<HEAD> field in the story settings. If there are changes to the [gsap](https://gsap.com/) version or the fonts, they need to be updated here.
```<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mozilla+Text:wght@200..700&family=Rubik+Mono+One&display=swap" rel="stylesheet">
<script src="https://kit.fontawesome.com/682d5d4551.js" crossorigin="anonymous"></script>    
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js"></script>```