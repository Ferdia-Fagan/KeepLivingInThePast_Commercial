# Coding standard:

This is not stuff that is written in stone and passed down to desciples.
It is just the designated discipline for this project. Anything else is 
acceptable until deemed not so.

# Rules:

1) A method/function/class should have meta comment if it provides enough 
value for the clutter.
2) If a function/method is meant to handle events, then add meta comment. 
Also must make a interface for the event in the local folder, with a const 
unique string that will allow mapping of comment to handler.
