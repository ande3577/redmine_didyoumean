require 'redmine'

Redmine::Plugin.register :redmine_didyoumean do
  name 'Did You Mean?'
  author 'David S Anderson'
  description 'A plugin to search for duplicate issues before opening them.'
  version '2.0.1'
  url 'https://www.github.com/ande3577/redmine_didyoumean'
  author_url 'https://www.github.com/ande3577'
  settings(:default => {'show_only_open' => '1', 'project_filter' => '1'}, :partial => 'settings/settings')
end

require 'redmine_didyoumean/hooks/didyoumean_hooks'
