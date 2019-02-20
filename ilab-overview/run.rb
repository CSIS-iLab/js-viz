

require 'rest-client'
require 'json'

$token = ACCESSTOKEN
$next_repos = "https://api.github.com/orgs/csis-ilab/repos"
$next_commits = ""
$repoURLs = []
$count = 0

def get_repos()
  repo_api = $next_repos
  params = {access_token: "#{$token}"}

  resp = RestClient.get("#{repo_api}", {params: params})
  header = parseHeader(resp.headers[:link])
  these_repos = JSON.parse(resp)

  $repoURLs.concat(these_repos.map{ |r| r["name"] })
  # $repoURLs = ['ocean']

  if header["next"]!= nil
    $next_repos = header["next"]
    get_repos()
  else
    $repoURLs.each{ |r| $name = r; get_commits(r) }
    puts "!!!!!!!!!!!!!!!!!!!!!!"
    puts $count
  end

end


def get_commits(r=nil)
  commit_api = "https://api.github.com/repos/CSIS-iLab"

  $next_commits = r ? "#{commit_api}/#{$name}/commits" : $next_commits

  params = {access_token: "#{$token}", since: '2017-09-01T00:00:00Z'}

  resp = RestClient.get("#{$next_commits}", {params: params})

  $count += JSON.parse(resp).size

  if resp.headers[:link]
    header = parseHeader(resp.headers[:link])

    if header["next"]!= nil
      $next_commits = header["next"]
      get_commits()
    else
      puts $count
    end

  end

end

def parseHeader(data)
  arrData = data.split("link:")

  data = arrData.size == 2? arrData[1]: data;

  parsed_data = Hash.new

  arrData = data.split(",")

  arrData.each do |d|
    linkInfo = d.match(/<([^>]+)>;\s+rel="([^"]+)"/i).captures
    parsed_data[linkInfo[1]]=linkInfo[0]
  end

  parsed_data

end


get_repos()
