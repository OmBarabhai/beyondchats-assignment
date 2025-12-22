<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats-blogs';

    protected $description = 'Scrape 5 fixed BeyondChats blog articles and store them in DB';

    public function handle()
    {
        $this->info('Starting scraping of 5 fixed blog URLs...');

        $urls = [
            'https://beyondchats.com/blogs/introduction-to-chatbots/',
            'https://beyondchats.com/blogs/live-chatbot/',
            'https://beyondchats.com/blogs/virtual-assistant/',
            'https://beyondchats.com/blogs/lead-generation-chatbots/',
            'https://beyondchats.com/blogs/chatbots-for-small-business-growth/',
        ];

        foreach ($urls as $url) {
            $this->info("Fetching: $url");

            $response = Http::get($url);
            if (!$response->successful()) {
                $this->error("Failed to fetch $url");
                continue;
            }

            $crawler = new Crawler($response->body());

            $title = $crawler->filter('h1')->first()->text();

            if ($crawler->filter('article')->count()) {
                $content = $crawler->filter('article')->text();
            } else {
                $content = $crawler->filter('body')->text();
            }

            Article::updateOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'title' => $title,
                    'content' => $content,
                    'source_url' => $url,
                    'is_updated' => false,
                ]
            );

            $this->info("Saved: $title");
        }

        $this->info('Scraping completed successfully.');
    }
}
