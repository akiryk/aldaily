#AL Daily Theme
This is a Wordpress theme for a prototype site exploring an alterate way to display the content on aldaily.com.

###How to use this theme
1. Copy it into wp-content/themes directory.
2. Enable it.

###How to use the same data as on aldaily.adamkiryk.com
1. Export database or use the file aldaily-database-backup in these files
2. Make sure that the data is correct for two lines in the wp_options table
  * option_id = 3, siteurl. 
  * option_id = 39, home. 

###How to display sidebar links correctly
1. Copy my-link-order plugin from aldaily/plugins_backup to wp-content/plugins.
2. Enable my-link-order