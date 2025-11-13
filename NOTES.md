Put this here to keep a running trail of my thoughts as I attempt this.

I've created a basic repo template to base my project on. It uses the following:

NextJS 16.0.2
Clerk 

I chose clerk because it's really easy to get running with and will serve this example well.

Here's an outline of the AC I was given:

> As a logged in user
> When I enter a string of characters into the input field
> If there are matching anagrams, I want to see a list of those words (including the input, if it is a valid word)
> If there are no matching anagrams, I want the lack of matches to be clearly communicated

A logged in user can be considered as someone who has registered and signed in using my Clerk application.

Now that I've got a skeletal app with (albeit crude) authentication I'll put a form component together. Nothing fancy but I'll lean on tailwind for making it presentable.
Accessibility should be a quick win here as well so I'll throw on the appropriate aria tags etc. I'll run some automated checks on all this when I'm done.
Colors look naff. I'll change them when I'm done.
This is client only at the moment. Let's look at options around this next.

One option here, for the algo is index each word in a list using a key comprised of all letters in sort order e.g. 

aechp : [
  peach
  cheap
]

If I normalise the search terms like this we have a pretty quick lookup method. I'm not looking at Big O for now.

Where can I source a reliable list of words from?

I was thinking wordle since I play that a lot:

https://github.com/Kinkelin/WordleCompetition/tree/main/data/official

But of course it's only 5 letter words! I need something more extensive.

https://github.com/dwyl/english-words

The alpha list seems ok for purpose of this demonstration. There's a JSON option as well. 

I'll index at module load time. The unfortunate aspect of this is that it will slow down the first hit to the route but I could always pre-hit it.
For the sake of this example I'm happy to live with this trade-off. Ideally I should do this as a build step. If I get time I'll try that out.

Tests introduced.

I've introduced a build step. Probably a bad idea to use fs if this were to run on an edge?

Flow so far is:

App Builds -> Prebuild builds index -> API serves a simple lookup on the JSON. No need for globals.

I was going to just code in a fetch call to the form but I'll throw SWR into the mix. A bit of a cleaner way to go about this.

Moved from using the form directly in the page to using a wrapper around it to keep it "dumb". The wrapper will handle the SWR and API interactions.
I'll stick with "use client" for now since there's no input until loaded.

Noticed that the original input appears in the anagram results. I'll remove that. Simple filter.

Some errors about cross-origin to take note of.

End to end this is working now. Just need to make sure that the endpoint is secured with Clerk.

Last once over of the story:

[*] As a logged in user
[*] When I enter a string of characters into the input field
[*] If there are matching anagrams, I want to see a list of those words (including the input, if it is a valid word)
  Argh! don't filter the input term out. Changed this and added a test.
[*] If there are no matching anagrams, I want the lack of matches to be clearly communicated

AC:
[*] The user can enter a string of characters into an input field.
[*] The user can see a list of anagrams of the input string.
[*] The user can see a message if there are no anagrams of the input string.

UI:

[*] Hide the anagram listing feature behind an authentication guard
[*] Only allow users to log in with a "Login with Gmail" button
[*] Use a modern UI library and framework prefereably Next.js with HeroUI
[*] Make sure that the UI is very intuitive and easy to interact with
  Sort of. With time constraints.
