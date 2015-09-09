#AL Daily Theme
This is a Wordpress theme for a prototype site exploring an alterate way to display the content on aldaily.com.

###How to use this theme
1. Copy it into wp-content/themes directory.
2. Enable it.

###How to use the same data as on aldaily.adamkiryk.com
1. Create a mysql database that will be used by Wordpress
2. Configure wordpress to use that database
3. Export original database from aldaily.adamkiryk.com or use the backup (see aldaily/backups/aldaily-database-backup)
4. Make sure that the data is correct for two lines in the wp_options table
  * option_id = 3, siteurl (e.g. localhost/myaldaily)
  * option_id = 39, home (e.g. localhost/myaldaily)

###How to display sidebar links correctly
1. Copy my-link-order plugin from aldaily/backups to wp-content/plugins.
2. Enable my-link-order