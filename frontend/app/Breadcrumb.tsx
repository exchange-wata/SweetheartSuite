import Link from 'next/link';

type PrevPath = {
  name: string;
  href: string;
};

type CurrentPath = {
  name: string;
};

type Props = {
  paths: [...PrevPath[], CurrentPath];
};

export const Breadcrumb = ({ paths }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-100 p-3 text-sm">
      <ol className="list-none flex">
        {paths.map((path, index) =>
          index < paths.length - 1 ? (
            <>
              <li>
                <Link
                  href={(path as PrevPath).href}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {path.name}
                </Link>
              </li>
              <li className="mx-2">{'>'}</li>
            </>
          ) : (
            <li>
              <span>{path.name}</span>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
};
