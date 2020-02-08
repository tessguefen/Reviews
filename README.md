# Reviews

**Current Version 1.006**

## Item Functions
```xml
<mvt:item name="tgreviews" param="Form_Template()" />
```
Render the Form Template.


```xml
<mvt:item name="tgreviews" param="Reviews_Template( l.settings:product:id )" />
```
Render the Reviews Template. Returns reviews array in l.settings:tgr:reviews. If you do not pass an id (i.e. put 0, or an empty string), it will return all approved reviews for the store.


```xml
<mvt:item name="tgreviews" param="Load_Product_Reviews( l.settings:product:id, l.settings:product:reviews )" />
```
Don't want to render the reviews template? Use this to save all the review data to a variable and utilize in template code.



```xml
<mvt:item name="tgreviews" param="Date( 'F jS, Y', l.settings:review:created, l.settings:review:formatted_created )" />
```
Format a timestamp, and save to a variable (3rd parameter). Uses PHP's date function as a reference.



```xml
<mvt:item name="tgreviews" param="Product_Rating( l.settings:product:id, l.settings:product:product_rating )" />
```
Returns the average product rating value to a variable (2nd parameter).


```xml
<mvt:item name="tgreviews" param="Product_Review_Breakdowns( l.settings:product:id, l.settings:tgr:breakdown )" />
```
Returns a breakdown of ratings for a product to a variable (2nd parameter). Array has 2 members: count and rating


```xml
<mvt:item name="tgreviews" param="Product_Review_Count( l.settings:product:id, l.settings:tgr:review_count )" />
```
Returns a total number of approved reviews for a product to a variable (2nd parameter).


```xml
<mvt:item name="tgreviews" param="Test_MailAfter_Email( 12345, 'hello@email.com' )" />
```
This will trigger the email for any order you specify, to the email you specify. This is specifcally made to test the email template. Please note: BCC and CC will not carry through. If you have left a review on a product in the order, it will skip that product.

## Live Example
![Bare Bones Broth](http://puu.sh/yQSkk/2c2e8fc323.png)

## Admin UI
![Yaaaaas](http://puu.sh/y4CIO/2af7659075.png)
![Admin UI](http://puu.sh/y7gbJ/cd4c2372d3.png)

## Future Feature Wishlist
- Do Not Email Me List
- Trigger emails (2 more) based on X days (if customer hasn't reviewed yet)
