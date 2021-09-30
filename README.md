# IXNAY


<hr/>
<h3>Building</h3>

```
npx serve
```
Do this in root, then head to http://localhost:5000/src/#/ . If you are given a different localhost address this is fine, however data cannot be stored as the peer stores on 5000. You can change this line 6 PeerManager.js

<hr/>

<h3>Theory</h3>

<p>If this is not clearing things up create an issue. We need clarity in the debrief of this project.</p>
------
Users can: <br/>
  Make orders: See Orders<br/>
  Fulfill orders: See Disman<br/>
    
    ├── Orders              # The messaging spec and libs used for all logs
        ├── Blueprint       # The 'what' of the order. The products design.
        └── Spec            # The 'how' of the order. Quantities, delivery locations, special requests, these are not kept publicly.
    └── Disman              # Distributed manufacturer - the maker of orders
        └── Assets          # Machinery used by Disman, assets decide if orders can be made by this Disman
        
  Under a users account there will be:
  
    └── Users               # user account
        └── Catalog         # A list of cloned and original blueprints
            └── Blueprint   # See Above
            

------

<hr/>
<h3>Community</h3>
https://discord.gg/MNtpJ9eHBS 

<hr/>
<h3>What do i want</h3>
Orders, blueprints, Dismans - why reinvent the wheel.<br/><br/> 

Its not about getting your custom part (really) were mapping the exit routes to autonomy. Collecting data, sharing data, learning off it to be able to bootstrap the ability to live in a given area without outside aid.
<br/><br/>
