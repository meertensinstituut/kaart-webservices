<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>{$titel}</title>
	<style type="text/css">
		{literal}
		div.bloc {
			border: 1px dashed gray;
			padding: 10px;
			margin-bottom: 20px;
		}

		p.return {
			font-size: small;
		}

		{/literal}
	</style>
</head>
<body>
<h1>{$titel}</h1>
<p>This is the XML-RPC service for the Meertens Kaart module.</p>
<p>A description of available XML-RPC methods follows.</p>
<h2><a name="index">Index of methods</a></h2>
<ul>
	{foreach from=$methods item=method}
		<li><a href="#{$method.name}">{$method.name}</a></li>
	{/foreach}
</ul>
<h2>Details</h2>
{foreach from=$methods item=method}
	<div class="bloc">
		<h3><a name="{$method.name}">{$method.name}</a></h3>
		<div>{$method.purpose}</div>
		<h4>Signatures</h4>
		<ol>
			{foreach from=$method.signatures item=signature}
				<li><b>Parameters:</b>
					{if isset($signature.params)}
						{foreach from=$signature.params item=param}
							{$param.type}
						{/foreach}
					{else}
						none
					{/if}
					<br/>
					<b>Return value:</b>
					{foreach from=$signature.returns item=return}
						{$return.type}
					{/foreach}
				</li>
			{/foreach}
		</ol>
		<p class="return"><a href="#index">return to index</a></p>
	</div>
{/foreach}
</body>
</html>