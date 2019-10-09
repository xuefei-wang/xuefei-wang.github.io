---
layout: page
title: Outdoors
---
A photo gallary of my hiking/climbing trips.

<div class="posts">
  {% for post in site.posts %}
    {% if post.path contains 'outdoors_0' %}
      <div class="post">
        <h1 class="post-title">
          <a href="{{ post.url }}">
            {{ post.title }}
          </a>
        </h1>

        <span class="post-date">{{ post.date | date_to_string }}</span>

        {{ post.content }}
      </div>
    {% endif %}
  {% endfor %}
</div>
